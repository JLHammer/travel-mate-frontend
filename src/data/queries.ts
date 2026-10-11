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

const FOOTER_TAGLINE = `coalesce(footerTagline[language == $lang][0].value, footerTagline[language == "en"][0].value)`;

// Site-wide content shown on every page, fetched once per language
export const SITE_SETTINGS_QUERY = defineQuery(`{
  "navigation": *[_type == "navigation" && _id == "navigation"][0] {
    "header": headerLinks[]{ ${NAV_LINK} },
    "footer": footerLinks[]{ ${NAV_LINK} }
  },
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0] {
    "footerTagline": ${FOOTER_TAGLINE},
    socials[]{ _key, platform, url }
  }
}`);

// The page texts, with the same English fallback as names and descriptions
const TITLE = `coalesce(title[language == $lang][0].value, title[language == "en"][0].value)`;
const TEXT = `coalesce(text[language == $lang][0].value, text[language == "en"][0].value)`;
const INTRO = `coalesce(intro[language == $lang][0].value, intro[language == "en"][0].value)`;
const BODY = `coalesce(body[language == $lang][0].value, body[language == "en"][0].value)`;
const LINK_LABEL = `coalesce(linkLabel[language == $lang][0].value, linkLabel[language == "en"][0].value)`;

const ABOUT_CARDS = `"title": ${TITLE}, "cards": cards[]{ _key, icon, "title": ${TITLE}, "text": ${TEXT}, linkPage, "linkLabel": ${LINK_LABEL} }`;

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    "title": ${TITLE},
    "intro": ${INTRO},
    "explore": explore { ${ABOUT_CARDS} },
    "features": features { ${ABOUT_CARDS} },
    "outro": outro { "title": ${TITLE}, "text": ${TEXT}, linkPage, "linkLabel": ${LINK_LABEL} }
  }
`);

// $id is privacyPage or termsPage, which share the same fields
export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && _id == $id][0] {
    "title": ${TITLE},
    "intro": ${INTRO},
    lastUpdated,
    "sections": sections[]{ _key, "title": ${TITLE}, "body": ${BODY} }
  }
`);

export const COUNTRIES_QUERY = defineQuery(`
  *[_type == "country"] | ${BY_NAME} { ${COUNTRY} }
`);

export const CITIES_QUERY = defineQuery(`
  *[_type == "city"] | ${BY_NAME} { ${CITY} }
`);

export const ATTRACTIONS_QUERY = defineQuery(`
  *[_type == "attraction"] | ${BY_NAME} { ${ATTRACTION} }
`);

// The carousels keep the order the editor dragged the places into
export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    "hero": hero {
      "title": ${TITLE},
      "text": ${TEXT},
      "tagline": ${TAGLINE},
      "image": image{ asset, crop, hotspot, "alt": null }
    },
    "countries": countries { "title": ${TITLE}, "items": items[]->{ ${COUNTRY} } },
    "cities": cities { "title": ${TITLE}, "items": items[]->{ ${CITY} } },
    "attractions": attractions { "title": ${TITLE}, "items": items[]->{ ${ATTRACTION} } }
  }
`);

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
