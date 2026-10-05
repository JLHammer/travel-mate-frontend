const localized = (field: string) => `"${field}": coalesce(${field}[$lang], ${field}.en)`;

const COUNTRY_SUMMARY = `_id, ${localized("name")}, code, "slug": slug.current`;
const CITY_SUMMARY = `_id, ${localized("name")}, "slug": slug.current`;
const IMAGE = `"imageUrl": image.asset->url`;
const CARD = `${localized("tagline")}, ${localized("description")}, ${IMAGE}, featured`;
const LOCATION = `"latitude": location.lat, "longitude": location.lng`;

export const COUNTRIES_QUERY = /* groq */ `
  *[_type == "country"] | order(name[$lang] asc) {
    ${COUNTRY_SUMMARY},
    ${CARD}
  }
`;

export const CITIES_QUERY = /* groq */ `
  *[_type == "city"] | order(name[$lang] asc) {
    ${CITY_SUMMARY},
    ${CARD},
    ${LOCATION},
    website,
    "country": country->{ ${COUNTRY_SUMMARY} }
  }
`;

export const ATTRACTIONS_QUERY = /* groq */ `
  *[_type == "attraction"] | order(name[$lang] asc) {
    _id,
    ${localized("name")},
    "slug": slug.current,
    ${CARD},
    category,
    address,
    ${LOCATION},
    website,
    "city": city->{ ${CITY_SUMMARY}, "country": country->{ ${COUNTRY_SUMMARY} } }
  }
`;

export const COUNTRY_DETAIL_QUERY = /* groq */ `
  *[_type == "country" && slug.current == $slug][0] {
    ${COUNTRY_SUMMARY},
    ${CARD},
    "cities": *[_type == "city" && references(^._id)] | order(name[$lang] asc) {
      ${CITY_SUMMARY},
      ${CARD}
    }
  }
`;

export const CITY_DETAIL_QUERY = /* groq */ `
  *[_type == "city" && slug.current == $slug][0] {
    ${CITY_SUMMARY},
    ${CARD},
    ${LOCATION},
    website,
    "country": country->{ ${COUNTRY_SUMMARY} },
    "attractions": *[_type == "attraction" && references(^._id)] | order(name[$lang] asc) {
      _id,
      ${localized("name")},
      "slug": slug.current,
      ${CARD},
      category
    }
  }
`;

export const ATTRACTION_DETAIL_QUERY = /* groq */ `
  *[_type == "attraction" && slug.current == $slug][0] {
    _id,
    ${localized("name")},
    "slug": slug.current,
    ${CARD},
    category,
    address,
    ${LOCATION},
    website,
    "city": city->{ ${CITY_SUMMARY}, "country": country->{ ${COUNTRY_SUMMARY} } },
    "related": *[_type == "attraction" && city._ref == ^.city._ref && _id != ^._id] | order(name[$lang] asc) {
      _id,
      ${localized("name")},
      "slug": slug.current,
      ${CARD},
      category
    }
  }
`;
