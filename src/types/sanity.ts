import type { BadgeCategory } from "./theme";

export type Language = "da" | "en" | "es";

interface CardFields {
  tagline: string | null;
  description: string | null;
  imageUrl: string | null;
  featured: boolean | null;
}

interface LocationFields {
  latitude: number | null;
  longitude: number | null;
  website: string | null;
}

export interface CountrySummary {
  _id: string;
  name: string | null;
  code: string | null;
  slug: string | null;
}

export interface Country extends CountrySummary, CardFields {}

export interface CitySummary {
  _id: string;
  name: string | null;
  slug: string | null;
}

export interface City extends CitySummary, CardFields, LocationFields {
  country: CountrySummary | null;
}

export interface AttractionSummary {
  _id: string;
  name: string | null;
  slug: string | null;
  imageUrl: string | null;
}

export interface Attraction extends AttractionSummary, CardFields, LocationFields {
  category: BadgeCategory | null;
  address: string | null;
  city: (CitySummary & { country: CountrySummary | null }) | null;
}

export type AttractionListItem = AttractionSummary & CardFields & { category: BadgeCategory | null };

export interface CountryDetail extends Country {
  cities: (CitySummary & CardFields)[];
}

export interface CityDetail extends City {
  attractions: AttractionListItem[];
}

export interface AttractionDetail extends Attraction {
  related: AttractionListItem[];
}

export interface CityCardData extends CitySummary {
  imageUrl: string | null;
  description?: string | null;
  country?: Pick<CountrySummary, "name"> | null;
}

export interface AttractionCardData extends AttractionSummary {
  description?: string | null;
  category?: BadgeCategory | null;
  city?: (Pick<CitySummary, "name"> & { country?: Pick<CountrySummary, "name"> | null }) | null;
}
