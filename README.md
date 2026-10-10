# TravelMate

TravelMate is a responsive travel guide site built with [React](https://react.dev/), [styled-components](https://styled-components.com/), [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vite.dev/). Countries, cities and attractions live in a [Sanity](https://www.sanity.io/) CMS (project [`cc196r01`](https://www.sanity.io/manage/project/cc196r01), dataset `production`).

## Getting started

```bash
cp .env.example .env
npm install
npm run dev
```

## Query language

I use **GROQ** to fetch data from Sanity.

### Why GROQ over GraphQL?

Sanity offers both GROQ and a GraphQL API. I chose GROQ for three reasons:

- **No deploy step.** GROQ is Sanity's own query language and reads the dataset directly. The GraphQL API has to be deployed with `sanity graphql deploy`, and deployed again every time the schema changes.
- **Responses shaped for the components.** GROQ can compute fields inside the query, so every query returns only the text in the selected language. With GraphQL, each field would come back in all three languages, and React would have to pick one.
- **References in both directions.** GROQ can follow a reference backwards with `references()`, so a country comes with its cities and a city with its attractions in one query. GraphQL only follows references forward, from an attraction to its city, so those lists would need a separate query.

## Content model

The content follows the structure of the TravelMate API:

```text
Country
  └── City        (city.country → reference to Country)
       └── Attraction  (attraction.city → reference to City)
```

## Schema types

The Studio has three document types: `country`, `city` and `attraction`. Their fields are defined in `schemaTypes/` in the Studio repo. Fields used by more than one type live in `schemaTypes/fields.ts`, so each one is defined only once.

| Field         | Type                           | Country | City | Attraction | Notes                                                                                  |
| ------------- | ------------------------------ | :-----: | :--: | :--------: | -------------------------------------------------------------------------------------- |
| `name`        | `internationalizedArrayString` |    ✓    |  ✓   |     ✓      | Required in every enabled language                                                     |
| `slug`        | `internationalizedArraySlug`   |    ✓    |  ✓   |     ✓      | Required in every enabled language, made from the name and unique across all languages |
| `code`        | `string`                       |    ✓    |      |            | Required two-letter ISO code in capitals, e.g. `IT`                                    |
| `country`     | `reference`                    |         |  ✓   |            | Required reference to a country                                                        |
| `city`        | `reference`                    |         |      |     ✓      | Required reference to a city                                                           |
| `category`    | `string`                       |         |      |     ✓      | Required, one of historical, museum, park, attraction or landmark                      |
| `tagline`     | `internationalizedArrayString` |    ✓    |  ✓   |     ✓      | Optional, max 80 characters per language                                               |
| `description` | `internationalizedArrayText`   |    ✓    |  ✓   |     ✓      | Required in every enabled language                                                     |
| `image`       | `image`                        |    ✓    |  ✓   |     ✓      | Required, with a hotspot, localized `alt` text and a `credit`                          |
| `address`     | `string`                       |         |      |     ✓      | Required unless the attraction has a `location`                                        |
| `location`    | `geopoint`                     |         |  ✓   |     ✓      | Latitude and longitude                                                                 |
| `website`     | `url`                          |         |  ✓   |     ✓      | Only `http` and `https` links                                                          |
| `featured`    | `boolean`                      |    ✓    |  ✓   |     ✓      | Shows the item in the featured sections on the home page                               |

The `internationalizedArray…` types come from `sanity-plugin-internationalized-array` and hold one item per language. They are described under [Info models](#2-info-models) below. A fourth document type, `locale`, holds the languages themselves (see [Language](#1-language)).

## Languages

TravelMate shows countries, cities and attractions in Danish, English and Spanish.

The user picks a language in the header, and every page switches to it.

The language follows this flow from the CMS to the screen:

```text
Language → Info models → GROQ → React → Language switch
```

| Step            | What it does                              | Where                                                           |
| --------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Language        | Defines which languages exist             | `locale` documents (Studio) → `src/i18n/languages.generated.ts` |
| Info models     | Store each text in every language         | `internationalizedArrayString`, `…Text`, `…Slug` (Studio)       |
| GROQ            | Pick out the selected language            | `src/data/queries.ts`                                           |
| React           | Send the selected language to the queries | `LanguageContext`, data hooks                                   |
| Language switch | Go to the same page in the new language   | `LanguageToggle`                                                |

### 1. Language

Each language is a `locale` document in the Studio, with a name, a two-letter code and an **Enabled** switch. Only administrators see them, under **Languages**. A language can't be deleted or unpublished, and its code can't change once it's published, because every translation is stored under that code.

`npm run typegen` in the Studio writes the enabled languages to `src/i18n/languages.generated.ts`:

```ts
export const LANGUAGES = [
  { id: "da", title: "Dansk" },
  { id: "en", title: "English" },
  { id: "es", title: "Español" },
] as const;

export type Language = (typeof LANGUAGES)[number]["id"];
```

The frontend reads its languages only from this file, through `LANGUAGES` in `src/i18n/translations.ts` and the `Language` type in `src/types/sanity.ts`. So the Studio and the website can't disagree about which languages exist, and a language reaches the website only after the developer has run typegen.

### 2. Info models

Text that changes with the language is stored with `sanity-plugin-internationalized-array`, Sanity's recommended plugin for field-level localization. It adds `internationalizedArrayString` for short text, `internationalizedArrayText` for longer text and `internationalizedArraySlug` for the URL part. Each holds one item per language. Data that is the same in every language stays directly on the document.

| Field                                                                         | Example                                           | Depends on language?                             | Type                                     |
| ----------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| `name`, `tagline`, `description`, `image.alt`                                 | `Danmark` / `Denmark` / `Dinamarca`               | Yes                                              | `internationalizedArrayString` / `…Text` |
| `slug`                                                                        | `danmark` / `denmark` / `dinamarca`               | Yes                                              | `internationalizedArraySlug`             |
| `category`                                                                    | `historical` → Historisk / Historical / Histórico | Yes, translated in the frontend from a fixed key | `string` (option list)                   |
| `code`, `image` (asset, credit), `location`, `address`, `website`, `featured` | `DK` in every language                            | No                                               | Plain fields on the document             |

A country is still a single document, and its translations sit next to each other:

```json
{
  "code": "IT",
  "name": [
    { "language": "da", "value": "Italien" },
    { "language": "en", "value": "Italy" },
    { "language": "es", "value": "Italia" }
  ]
}
```

The editor adds a language with the buttons under each field, which add an empty row to translate. Validation reads the `locale` documents:

- In **enabled** languages, a missing `name`, `description` or `slug` is an error, so the document can't be published.
- In languages that **aren't enabled yet**, it's a warning, so editors can see what's left while they translate.
- Missing `image.alt` text is only a warning, in every language.

### 3. GROQ

Every query takes a `$lang` parameter. Each localized field picks the item in the selected language:

```groq
"name": coalesce(name[language == $lang][0].value, name[language == "en"][0].value)
```

- `name[language == $lang][0].value` finds the item whose `language` is `$lang` and reads its `value`. It works for any language, so no query lists the languages.
- `coalesce(..., name[language == "en"][0].value)` uses English if the text is missing in the selected language. For `name` and `description` that can't happen in an enabled language, but `tagline` and `image.alt` are optional.

The expressions live as shared constants (`NAME`, `TAGLINE`, `DESCRIPTION`, `ALT`, `SLUG`) in `src/data/queries.ts`, so they are written once and used by every query. Lists are sorted by the name in the selected language too. React receives plain text, e.g. `name: "Italien"`, and never handles the language array itself.

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

|               | Danish                   | English                       | Spanish                           |
| ------------- | ------------------------ | ----------------------------- | --------------------------------- |
| Country list  | `/lande`                 | `/countries`                  | `/paises`                         |
| A country     | `/lande/italien`         | `/countries/italy`            | `/paises/italia`                  |
| An attraction | `/sevaerdigheder/tivoli` | `/attractions/tivoli-gardens` | `/atracciones/jardines-de-tivoli` |

- **No language prefix.** No section name is used by two languages, so the first part of the URL already says which language it is. `languageOfPath` in `src/router/routes.ts` looks it up in `SEGMENTS`, the table of section names. The front page is `/` in every language.
- **Links** are built with `usePaths()`, which returns every path in the current language, e.g. `paths.country(slug)`. Components never write a path by hand.
- **Slugs** are made in the Studio from the name in each language, transliterated to ASCII (`Akershus Fæstning` → `akershus-faestning`) so URLs never need percent-encoding. A slug must be unique across all languages within its type, so a URL always leads to one document.
- **Detail pages accept the slug in any language.** If a Danish reader opens a shared `/attractions/tivoli-gardens`, the page loads and redirects to `/sevaerdigheder/tivoli`. The query matches the slug in any language with `$slug in slug[].value.current` and returns every language's slug (`slugs`), and `useLocalizedSlug` uses them both for that redirect and to tell `LanguageToggle` the exact URL in the other languages.

Countries, cities and attractions all change together, with no code specific to the language switch in any page.

### Choosing a localization model

There are three ways to structure translations in Sanity. The difference is where the translated text lives.

**Field-level localization (TravelMate).** Each text field holds one value per language. Language is organised per field: "here is the name in every language".

```json
{
  "_type": "country",
  "code": "IT",
  "name": [
    { "language": "da", "value": "Italien" },
    { "language": "en", "value": "Italy" }
  ]
}
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

|                                                              | Field-level localization (TravelMate)                         | Embedded language objects (assignment)             | Document-level localization            |
| ------------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------- |
| Where the text lives                                         | In each field                                                 | In a list inside the document                      | In separate documents                  |
| Documents per country (2 languages)                          | 1 (+ Language documents)                                      | 1 (+ Language documents)                           | 2 or more                              |
| What "Language" is                                           | A document type, generated into a typed list for the frontend | A document type, referenced from each entry        | A field or a document type             |
| Can a translation go missing unnoticed?                      | No, validation catches it in every enabled language           | Yes, nobody has to add the entry                   | Yes, nobody has to create the document |
| Editor experience                                            | All languages side by side                                    | One block per language                             | Jump between documents                 |
| Query                                                        | Simplest: one filter on the field                             | Filter the array and follow the language reference | Filter on language across documents    |
| Can each language have its own fields or publish on its own? | No                                                            | No                                                 | Yes                                    |

#### Why field-level localization

Document-level localization is the strongest model when each language needs its own fields, its own publishing schedule or its own editors, or when a site has many languages. TravelMate has none of those needs:

- **Every language has the same structure.** A country has the same fields in every language, and only the text differs.
- **Translations can't go missing unnoticed.** The editor sees all languages side by side, and the validation names every enabled language that's missing a `name`, `description` or `slug`. With `info` entries, nothing warns if a language is forgotten or added twice.
- **Simpler queries.** GROQ picks the language inside the field with one filter, without following a reference to a language document.
- **Adding a language needs no schema or query changes.** The arrays are filtered on `language`, so a new language is just new items. An object with one field per language (`name.da`, `name.en`, …) needs a new field in the schema and a new branch in every query, and every language adds to Sanity's attribute limit. The arrays use the same attributes however many languages there are.
- **It matches Sanity's own guidance.** Sanity's localization docs describe field-level localization as best for documents with a mix of language-specific and shared fields. TravelMate's documents are exactly that: `name`, `tagline`, `description` and `slug` are translated, while `image`, `location` and the rest are shared.

The parts of the assignment's model are still there, in a different form: its `language` documents are the `locale` documents, and its `info` objects are the items in each field's array, which also point to their language.

### Adding a language

1. **Studio (an administrator):** create a `locale` document with the name and code, and leave **Enabled** off. Every localized field now offers the new language.
2. **Content (editors):** translate `name`, `tagline`, `description` and `image.alt`, and generate the slugs. Warnings show every document that's still missing the language. When none are left, switch **Enabled** on.
3. **Frontend (the developer):** run `npm run typegen` in the Studio. The new code appears in the `Language` type, and TypeScript flags every place that needs a translation: the UI text in `src/i18n/translations.ts`, the privacy and terms text in `src/i18n/legal.ts` and the section names in `SEGMENTS` in `src/router/routes.ts`. No query or component needs to change.

Steps 1 and 2 need no code. Step 3 stays with a developer on purpose: the menus, buttons and legal text live in code so TypeScript can check that none is missing, and the language only appears on the website once they are translated.

## API calls and Custom Hooks

Page components never call Sanity directly. Content follows this flow from the CMS to the screen:

```text
Sanity → GROQ → Custom Hook → React Component → User
```

Each step is its own layer:

- **Sanity client** (`src/utils/sanityClient.ts`): one shared `@sanity/client` instance configured with the project ID and dataset from `.env`. It builds the request URL, encodes the query and passes GROQ parameters safely, so no URL is put together by hand.
- **GROQ queries** (`src/data/queries.ts`): every query lives in one place, separate from the components. Queries are built from shared fragments (`CITY_SUMMARY`, `IMAGE`, `CARD`, …) so each field is defined once. They pick the text in the selected language (da/en/es), follow references with `->` (a city comes with its country), and use `references(^._id)` to fetch the reverse relations (a country with its cities, a city with its attractions).
- **TypeScript types** (`src/types/`): each type matches the shape a GROQ query returns. They are generated by Sanity TypeGen (see below).
- **Generic hook** (`src/hooks/useSanityQuery.ts`): one reusable hook that runs any query and returns `{ data, isLoading, error, refetch }`. It cancels outdated requests with an `AbortController` when the parameters change, for example when the user switches language or opens another city.
- **Data hooks** (`src/hooks/`): small hooks that pair a query with its parameters and result type. `useFavoriteAttractions` also combines the query with the liked attraction IDs:

  | Hook                                          | Used for                                                                  |
  | --------------------------------------------- | ------------------------------------------------------------------------- |
  | `useFeatured`                                 | Featured countries, cities and attractions on the home page (one request) |
  | `useCountries`, `useCities`, `useAttractions` | List pages                                                                |
  | `useCountry`, `useCity`, `useAttraction`      | Detail pages, looked up by slug                                           |
  | `useSearch`                                   | Search results                                                            |
  | `useFavoriteAttractions`                      | The favourites page, by liked attraction IDs                              |

- **Components:** detail pages and list sections call a data hook, show the `Loader` while loading and an `ErrorState` box with a retry button (which calls `refetch`) if the CMS can't be reached, then pass the data on to the card and detail components.

Images come from Sanity too. `src/utils/imageUrl.ts` builds responsive `srcset` URLs and positions the image by the hotspot set in the Studio.

## Generated types (Sanity TypeGen)

The types for query results are not written by hand. Sanity TypeGen reads the Studio schema and every `defineQuery` in `src/data/queries.ts`, then writes `src/types/sanity.types.ts`. `src/types/sanity.ts` gives those generated types shorter names for the components. If a field is renamed in the Studio, TypeScript shows an error in the frontend instead of the page quietly showing nothing.

The Studio repo must sit next to this one (`TravelMate/travel-mate-cms/studio`). After changing a schema or a query, run:

```bash
cd ../travel-mate-cms/studio
npm run typegen
```

Query fragments in `queries.ts` are plain string constants, not helper functions, because TypeGen can only read constants.

`npm run typegen` also writes `src/i18n/languages.generated.ts` from the enabled `locale` documents (see [Language](#1-language)).

## Showing that content comes from the CMS

Change the name or description of a city in Sanity Studio, then reload TravelMate. The change appears without any change to the React code.

The client queries Sanity's live API rather than the CDN (`useCdn: false`), so changes show up right away.
