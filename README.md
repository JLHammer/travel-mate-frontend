# TravelMate

TravelMate is a travel guide built with React, TypeScript, Vite and styled-components. Countries, cities and attractions come from a Sanity CMS (project `cc196r01`, dataset `production`). None of this content is written in the React code.

```text
Sanity → GROQ → Custom Hook → React Component → User
```

## Getting started

```bash
npm install
npm run dev
```

## GROQ or GraphQL?

I use **GROQ** to fetch data from Sanity.

### Why GROQ

I chose GROQ because it's native to Sanity and needs no schema deploy. It lets me shape each response to exactly what my components need, and it can follow references in both directions in one query. I use that for the city page's attractions.

## Content model

The content follows the structure of the TravelMate API:

```text
Country
  └── City        (city.country → reference to Country)
       └── Attraction  (attraction.city → reference to City)
```

## Languages

TravelMate shows countries, cities and attractions in Danish, English and Spanish.

The user picks a language in the header, and every page switches to it.

The language follows this flow from the CMS to the screen:

```text
Language → Info models → GROQ → React → Language switch
```

| Step | What it does | Where |
|---|---|---|
| Language | Defines which languages exist | `schemaTypes/languages.ts` (Studio) |
| Info models | Store each text in every language | `localeString`, `localeText` (Studio) |
| GROQ | Pick out the selected language | `src/data/queries.ts` |
| React | Send the selected language to the queries | `LanguageContext`, data hooks |
| Language switch | Go to the same page in the new language | `LanguageToggle` |

### 1. Language

The languages are defined once in the Studio, in `schemaTypes/languages.ts`:

```ts
export const LANGUAGES = [
  {id: 'da', title: 'Dansk'},
  {id: 'en', title: 'English'},
  {id: 'es', title: 'Español'},
]
```

The frontend has a matching list in `src/i18n/translations.ts`, and the type `Language = "da" | "en" | "es"` in `src/types/sanity.ts`.

### 2. Info models

Three object types are built from `LANGUAGES`. `localeString` is for short text, `localeText` for longer text and `localeSlug` for the URL part, and each has one field per language. Text that changes with the language uses these types. Data that is the same in every language stays directly on the document.

| Field | Depends on language? | Type |
|---|---|---|
| `name`, `tagline`, `description`, `image.alt` | Yes | `localeString` / `localeText` |
| `slug` | Yes | `localeSlug` |
| `category` | Yes, translated in the frontend from a fixed key | `string` (option list) |
| `code`, `image` (asset, credit), `location`, `address`, `website`, `featured` | No | Plain fields on the document |

A country is still a single document, and its translations sit next to each other:

```json
{
  "code": "IT",
  "name": { "da": "Italien", "en": "Italy", "es": "Italia" },
  "description": { "da": "…", "en": "…", "es": "Italia es conocida por su rica historia…" }
}
```

Validation in the Studio requires every language on `name`, `description` and `slug`, so a country, city or attraction can't be published with a translation missing. Missing `image.alt` text only gives a warning.

### 3. GROQ

Every query takes a `$lang` parameter. Each localized field picks the selected language:

```groq
"name": coalesce(select($lang == "da" => name.da, $lang == "es" => name.es), name.en)
```

- `select(...)` picks `name.da` or `name.es` depending on `$lang`.
- `coalesce(..., name.en)` uses English if the text is empty in the selected language. For `name` and `description` that can't happen once a document is published, but `tagline` and `image.alt` are optional.

The expressions live as shared constants (`NAME`, `TAGLINE`, `DESCRIPTION`, `ALT`, `SLUG`) in `src/data/queries.ts`, so they are written once and used by every query. Lists are sorted by the name in the selected language too. React receives plain text, e.g. `name: "Italien"`, and never handles the language object itself.

### 4. React

- **`LanguageContextProvider`** reads the language from the URL (see [URLs](#urls)). On pages without a section, like the front page, it uses the last language the user had, or the browser's language on the first visit, and Danish otherwise. The language is saved in `localStorage` and set on `<html lang>` for screen readers.
- **`useLanguage`** gives components the language and `setLanguage`.
- **Data hooks** (`useCountry`, `useCities`, …) send the language to the query as `lang`:

  ```ts
  const { language } = useLanguage();
  return useSanityQuery(COUNTRY_DETAIL_QUERY, { slug: slug ?? "", lang: language });
  ```

- **Fixed UI text** (navigation, buttons, forms, footer) doesn't come from Sanity. It lives in `src/i18n/translations.ts` and is read through `useTranslation`.

### 5. Language switch

When the user picks a language in `LanguageToggle` in the header:

1. `setLanguage("en")` navigates to the same page in English, e.g. from `/lande/italien` to `/countries/italy`. On the front page the URL stays `/`.
2. The new URL gives the context a new language, and every component that uses `useLanguage` renders again.
3. The data hooks now send `lang: "en"`. `useSanityQuery` sees the new parameter, cancels the old request and fetches again.
4. GROQ returns the English text, and the page shows it.
5. `useTranslation` switches the fixed UI text at the same time.
6. The choice is saved in `localStorage` and set on `<html lang="en">`.

### URLs

Every page has its own URL in each language. The section names are translated, and so are the slugs:

| | Danish | English | Spanish |
|---|---|---|---|
| Country list | `/lande` | `/countries` | `/paises` |
| A country | `/lande/italien` | `/countries/italy` | `/paises/italia` |
| An attraction | `/seevaerdigheder/tivoli` | `/attractions/tivoli-gardens` | `/atracciones/jardines-de-tivoli` |

- **No language prefix.** No section name is used by two languages, so the first part of the URL already says which language it is. `languageOfPath` in `src/router/routes.ts` looks it up in `SEGMENTS`, the table of section names. The front page is `/` in every language.
- **Links** are built with `usePaths()`, which returns every path in the current language, e.g. `paths.country(slug)`. Components never write a path by hand.
- **Slugs** are made in the Studio from the name in each language, transliterated to ASCII (`Akershus Fæstning` → `akershus-faestning`) so URLs never need percent-encoding. A slug must be unique across all languages within its type, so a URL always leads to one document.
- **Detail pages accept the slug in any language.** If a Danish reader opens a shared `/attractions/tivoli-gardens`, the page loads and redirects to `/seevaerdigheder/tivoli`. The query returns all three slugs (`slugs`), and `useLocalizedSlug` uses them both for that redirect and to tell `LanguageToggle` the exact URL in the other languages.

Countries, cities and attractions all change together, with no code specific to the language switch in any page.

### Choosing a localization model

There are three ways to structure translations in Sanity. The difference is where the translated text lives.

**Field-level localization (TravelMate).** Each text field holds one value per language. Language is organised per field: "here is the name in every language".

```json
{ "_type": "country", "code": "IT", "name": { "da": "Italien", "en": "Italy" } }
```

**Embedded language objects (the assignment's model).** The document holds an `info` array with one object per language, and each object has all the text for that language. Language is organised per bundle: "here is everything in Danish". In the assignment's Studio, `language` is a document type, and `countryInfo` and `cityInfo` are object types inside `country.info` and `city.info`. Each object points to its language with a reference.

```text
language { name: "Dansk", code: "da" }
country  { name, code, image, info: [countryInfo, …] }
  countryInfo { language: → language (da), name: "Italien", slug, description: "…" }
```

```groq
"info": info[language->code == $lang][0] { name, "slug": slug.current, description }
```

**Document-level localization.** Each language version is a document of its own, connected to the others by references or by the `@sanity/document-internationalization` plugin. A country in two languages becomes two documents, and shared data like the image is stored in each of them or in a separate base document.

```groq
*[_type == "country" && language == $lang && slug.current == $slug][0]
```

#### Comparison

| | Field-level localization (TravelMate) | Embedded language objects (assignment) | Document-level localization |
|---|---|---|---|
| Where the text lives | In each field | In a list inside the document | In separate documents |
| Documents per country (2 languages) | 1 | 1 (+ Language documents) | 2 or more |
| What "Language" is | A list in code | A document type, referenced from each entry | A field or a document type |
| Can a translation go missing unnoticed? | No, validation catches it on `name`, `description` and `slug` | Yes, nobody has to add the entry | Yes, nobody has to create the document |
| Editor experience | All languages side by side | One block per language | Jump between documents |
| Query | Simplest | Filter the array and follow the language reference | Filter on language across documents |
| Can each language have its own fields or publish on its own? | No | No | Yes |

#### Why field-level localization

Document-level localization is the strongest model when each language needs its own fields, its own publishing schedule or its own editors, or when a site has many languages. TravelMate has none of those needs:

- **Every language has the same structure.** A country has the same fields in every language, and only the text differs.
- **Translations can't go missing unnoticed.** The editor sees all languages side by side, and the validation flags a missing `name`, `description` or `slug`. With `info` entries, the editor adds one entry per language by hand, and nothing warns if a language is forgotten or added twice.
- **Simpler queries.** GROQ reads the right language straight from the field, without filtering an array or following a reference to the language.
- **It matches Sanity's own guidance.** Sanity's localization docs describe field-level localization as best for documents with a mix of language-specific and shared fields. TravelMate's documents are exactly that: `name`, `tagline`, `description` and `slug` are translated, while `image`, `location` and the rest are shared.

The parts of the assignment's model are still there, in a different form: the `language` documents are the `LANGUAGES` list, and the `info` objects are the `localeString`/`localeText`/`localeSlug` objects on each field.

### Adding a language

Adding a fourth language takes:

1. **Sanity:** one line in `LANGUAGES` in `schemaTypes/languages.ts`. The new field appears on every localized field in the Studio automatically.
2. **Content:** translating `name`, `tagline`, `description` and `image.alt`, and generating the new slug, in the Studio. Validation flags every document that is still missing the new language.
3. **GROQ:** one more branch in the `select()` for `NAME`, `TAGLINE`, `DESCRIPTION`, `ALT` and `SLUG`, and the new language in `SLUGS` and `MATCHES_SLUG`, then `npm run typegen`.
4. **React:** one entry in `LANGUAGES` and a translation object for the UI text in `src/i18n/translations.ts`, the privacy and terms text in `src/i18n/legal.ts`, the language code in the `Language` type in `src/types/sanity.ts`, and the section names in `SEGMENTS` in `src/router/routes.ts`. TypeScript flags any translation that is missing. No component needs to change.

## API calls and Custom Hooks

Page components never call Sanity directly. The data flow is split into layers:

- **Sanity client** (`src/utils/sanityClient.ts`): one shared `@sanity/client` instance configured with the project ID and dataset from `.env`. It builds the request URL, encodes the query and passes GROQ parameters safely, so no URL is put together by hand.
- **GROQ queries** (`src/data/queries.ts`): every query lives in one place, separate from the components. Queries are built from shared fragments (`CITY_SUMMARY`, `IMAGE`, `CARD`, …) so each field is defined once. They pick the text in the selected language (da/en/es), follow references with `->` (a city comes with its country), and use `references(^._id)` to fetch the reverse relations (a country with its cities, a city with its attractions).
- **TypeScript types** (`src/types/`): each type matches the shape a GROQ query returns. They are generated by Sanity TypeGen (see below).
- **Generic hook** (`src/hooks/useSanityQuery.ts`): one reusable hook that runs any query and returns `{ data, isLoading, error, refetch }`. It cancels outdated requests with an `AbortController` when the parameters change, for example when the user switches language or opens another city.
- **Data hooks** (`src/hooks/`): small hooks that pair a query with its parameters and result type. `useFavoriteAttractions` also combines the query with the liked attraction IDs:

  | Hook | Used for |
  |---|---|
  | `useFeatured` | Featured countries, cities and attractions on the home page (one request) |
  | `useCountries`, `useCities`, `useAttractions` | List pages |
  | `useCountry`, `useCity`, `useAttraction` | Detail pages, looked up by slug |
  | `useSearch` | Search results |
  | `useFavoriteAttractions` | The favourites page, by liked attraction IDs |

- **Components:** detail pages and list sections call a data hook, show the `Loader` while loading and an error message if the CMS can't be reached, then pass the data on to the card and detail components.

Images come from Sanity too. `src/utils/imageUrl.ts` builds responsive `srcset` URLs and positions the image by the hotspot set in the Studio.

## Generated types (Sanity TypeGen)

The types for query results are not written by hand. Sanity TypeGen reads the Studio schema and every `defineQuery` in `src/data/queries.ts`, then writes `src/types/sanity.types.ts`. `src/types/sanity.ts` gives those generated types shorter names for the components. If a field is renamed in the Studio, TypeScript shows an error in the frontend instead of the page quietly showing nothing.

The Studio repo must sit next to this one (`TravelMate/travel-mate-cms/studio`). After changing a schema or a query, run:

```bash
cd ../travel-mate-cms/studio
npm run typegen
```

Query fragments in `queries.ts` are plain string constants, not helper functions, because TypeGen can only read constants.

## Showing that content comes from the CMS

Change the name or description of a city in Sanity Studio, then reload TravelMate. The change appears without any change to the React code.

The client queries Sanity's live API rather than the CDN (`useCdn: false`), so changes show up right away.
