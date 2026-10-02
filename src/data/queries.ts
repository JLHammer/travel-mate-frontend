export const COUNTRIES_QUERY = /* groq */ `
  *[_type == "country"] | order(name asc) {
    _id,
    name,
    code,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url
  }
`;

export const CITIES_QUERY = /* groq */ `
  *[_type == "city"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    "country": country->{ _id, name, code, "slug": slug.current }
  }
`;

export const ATTRACTIONS_QUERY = /* groq */ `
  *[_type == "attraction"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    address,
    latitude,
    longitude,
    "city": city->{ _id, name, "slug": slug.current }
  }
`;

export const CITY_DETAIL_QUERY = /* groq */ `
  *[_type == "city" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    "country": country->{ _id, name, code, "slug": slug.current },
    "attractions": *[_type == "attraction" && references(^._id)] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }
  }
`;
