import { defineQuery } from "groq";

// Each localized field holds one item per language, e.g. name: [{ language: "da", value: "Italien" }, …].
// These pick the selected language, or English if the text is missing there, so no query names a language
const NAME = `coalesce(name[language == $lang][0].value, name[language == "en"][0].value)`;
const TAGLINE = `coalesce(tagline[language == $lang][0].value, tagline[language == "en"][0].value)`;
const DESCRIPTION = `coalesce(description[language == $lang][0].value, description[language == "en"][0].value)`;
const ALT = `coalesce(alt[language == $lang][0].value, alt[language == "en"][0].value)`;
const BY_NAME = `order(${NAME} asc)`;

// The slug in the selected language, for links
const SLUG = `coalesce(slug[language == $lang][0].value.current, slug[language == "en"][0].value.current)`;
// Every language's slug, so a detail page knows its URL in the other languages
const SLUGS = `"slugs": slug[]{ language, "slug": value.current }`;
// Detail pages accept the slug in any language, so a shared link still opens in the reader's language
const MATCHES_SLUG = `$slug in slug[].value.current`;

const COUNTRY_SUMMARY = `_id, "name": ${NAME}, code, "slug": ${SLUG}`;
const CITY_SUMMARY = `_id, "name": ${NAME}, "slug": ${SLUG}`;
const IMAGE = `image{ asset, crop, hotspot, "alt": ${ALT} }`;
const CARD = `"tagline": ${TAGLINE}, "description": ${DESCRIPTION}, ${IMAGE}`;
const LOCATION = `"latitude": location.lat, "longitude": location.lng`;

const COUNTRY = `${COUNTRY_SUMMARY}, ${CARD}`;

const CITY = `
  ${CITY_SUMMARY},
  ${CARD},
  ${LOCATION},
  website,
  "country": country->{ ${COUNTRY_SUMMARY} }
`;

const ATTRACTION = `
  _id,
  "name": ${NAME},
  "slug": ${SLUG},
  ${CARD},
  category,
  address,
  ${LOCATION},
  website,
  "city": city->{ ${CITY_SUMMARY}, "country": country->{ ${COUNTRY_SUMMARY} } }
`;

const ATTRACTION_LIST_ITEM = `_id, "name": ${NAME}, "slug": ${SLUG}, ${CARD}, category`;

// No English fallback here: a label left empty in this language is null, and the menu shows
// the page's standard name in the same language instead
const NAV_LINK = `_key, page, "label": label[language == $lang][0].value`;

// Site-wide content shown on every page, fetched once per language
export const SITE_SETTINGS_QUERY = defineQuery(`{
  "navigation": *[_id == "navigation"][0] {
    "header": headerLinks[]{ ${NAV_LINK} },
    "footer": footerLinks[]{ ${NAV_LINK} }
  }
}`);

export const COUNTRIES_QUERY = defineQuery(`
  *[_type == "country"] | ${BY_NAME} { ${COUNTRY} }
`);

export const CITIES_QUERY = defineQuery(`
  *[_type == "city"] | ${BY_NAME} { ${CITY} }
`);

export const ATTRACTIONS_QUERY = defineQuery(`
  *[_type == "attraction"] | ${BY_NAME} { ${ATTRACTION} }
`);

export const FEATURED_QUERY = defineQuery(`{
  "countries": *[_type == "country" && featured == true] | ${BY_NAME} { ${COUNTRY} },
  "cities": *[_type == "city" && featured == true] | ${BY_NAME} { ${CITY} },
  "attractions": *[_type == "attraction" && featured == true] | ${BY_NAME} { ${ATTRACTION} }
}`);

export const SEARCH_QUERY = defineQuery(`{
  "countries": *[_type == "country"] | ${BY_NAME} { ${COUNTRY} },
  "cities": *[_type == "city"] | ${BY_NAME} {
    ${CITY_SUMMARY},
    ${CARD},
    "country": country->{ "name": ${NAME} }
  },
  "attractions": *[_type == "attraction"] | ${BY_NAME} {
    ${ATTRACTION_LIST_ITEM},
    "city": city->{ "name": ${NAME}, "country": country->{ "name": ${NAME} } }
  }
}`);

export const FAVORITE_ATTRACTIONS_QUERY = defineQuery(`
  *[_type == "attraction" && _id in $ids] | ${BY_NAME} { ${ATTRACTION} }
`);

export const COUNTRY_DETAIL_QUERY = defineQuery(`
  *[_type == "country" && ${MATCHES_SLUG}][0] {
    ${COUNTRY},
    ${SLUGS},
    "cities": *[_type == "city" && references(^._id)] | ${BY_NAME} {
      ${CITY_SUMMARY},
      ${CARD}
    }
  }
`);

export const CITY_DETAIL_QUERY = defineQuery(`
  *[_type == "city" && ${MATCHES_SLUG}][0] {
    ${CITY},
    ${SLUGS},
    "attractions": *[_type == "attraction" && references(^._id)] | ${BY_NAME} {
      ${ATTRACTION_LIST_ITEM}
    }
  }
`);

export const ATTRACTION_DETAIL_QUERY = defineQuery(`
  *[_type == "attraction" && ${MATCHES_SLUG}][0] {
    ${ATTRACTION},
    ${SLUGS},
    "related": *[_type == "attraction" && city._ref == ^.city._ref && _id != ^._id] | ${BY_NAME} {
      ${ATTRACTION_LIST_ITEM}
    }
  }
`);
