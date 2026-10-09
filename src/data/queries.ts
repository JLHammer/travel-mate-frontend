import { defineQuery } from "groq";

const NAME = `coalesce(select($lang == "da" => name.da, $lang == "es" => name.es), name.en)`;
const TAGLINE = `coalesce(select($lang == "da" => tagline.da, $lang == "es" => tagline.es), tagline.en)`;
const DESCRIPTION = `coalesce(select($lang == "da" => description.da, $lang == "es" => description.es), description.en)`;
const ALT = `coalesce(select($lang == "da" => alt.da, $lang == "es" => alt.es), alt.en)`;
const BY_NAME = `order(${NAME} asc)`;

const COUNTRY_SUMMARY = `_id, "name": ${NAME}, code, "slug": slug.current`;
const CITY_SUMMARY = `_id, "name": ${NAME}, "slug": slug.current`;
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
  "slug": slug.current,
  ${CARD},
  category,
  address,
  ${LOCATION},
  website,
  "city": city->{ ${CITY_SUMMARY}, "country": country->{ ${COUNTRY_SUMMARY} } }
`;

const ATTRACTION_LIST_ITEM = `_id, "name": ${NAME}, "slug": slug.current, ${CARD}, category`;

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
  *[_type == "country" && slug.current == $slug][0] {
    ${COUNTRY},
    "cities": *[_type == "city" && references(^._id)] | ${BY_NAME} {
      ${CITY_SUMMARY},
      ${CARD}
    }
  }
`);

export const CITY_DETAIL_QUERY = defineQuery(`
  *[_type == "city" && slug.current == $slug][0] {
    ${CITY},
    "attractions": *[_type == "attraction" && references(^._id)] | ${BY_NAME} {
      ${ATTRACTION_LIST_ITEM}
    }
  }
`);

export const ATTRACTION_DETAIL_QUERY = defineQuery(`
  *[_type == "attraction" && slug.current == $slug][0] {
    ${ATTRACTION},
    "related": *[_type == "attraction" && city._ref == ^.city._ref && _id != ^._id] | ${BY_NAME} {
      ${ATTRACTION_LIST_ITEM}
    }
  }
`);
