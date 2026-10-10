import type {
  ATTRACTION_DETAIL_QUERY_RESULT,
  ATTRACTIONS_QUERY_RESULT,
  CITIES_QUERY_RESULT,
  CITY_DETAIL_QUERY_RESULT,
  COUNTRIES_QUERY_RESULT,
  COUNTRY_DETAIL_QUERY_RESULT,
  FAVORITE_ATTRACTIONS_QUERY_RESULT,
  FEATURED_QUERY_RESULT,
  SEARCH_QUERY_RESULT,
} from "./sanity.types";
import type { BadgeCategory } from "./theme";

// Generated from the enabled languages in the Studio by npm run typegen
export type { Language } from "../i18n/languages.generated";

export type Country = COUNTRIES_QUERY_RESULT[number];
export type City = CITIES_QUERY_RESULT[number];
export type Attraction = ATTRACTIONS_QUERY_RESULT[number];
export type FavoriteAttraction = FAVORITE_ATTRACTIONS_QUERY_RESULT[number];
export type Featured = FEATURED_QUERY_RESULT;
export type SearchData = SEARCH_QUERY_RESULT;

export type CountryDetail = NonNullable<COUNTRY_DETAIL_QUERY_RESULT>;
export type CityDetail = NonNullable<CITY_DETAIL_QUERY_RESULT>;
export type AttractionDetail = NonNullable<ATTRACTION_DETAIL_QUERY_RESULT>;

export type SanityImage = NonNullable<Country["image"]>;

export type CountrySummary = NonNullable<City["country"]>;
export type CitySummary = Pick<City, "_id" | "name" | "slug">;
export type AttractionSummary = Pick<Attraction, "_id" | "name" | "slug" | "image">;

export interface CityCardData extends CitySummary {
  image: SanityImage | null;
  description?: string | null;
  country?: Pick<CountrySummary, "name"> | null;
}

export interface AttractionCardData extends AttractionSummary {
  description?: string | null;
  category?: BadgeCategory | null;
  city?: (Pick<CitySummary, "name"> & { country?: Pick<CountrySummary, "name"> | null }) | null;
}
