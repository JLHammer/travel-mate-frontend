export interface CountrySummary {
  _id: string;
  name: string | null;
  code: string | null;
  slug: string | null;
}

export interface Country extends CountrySummary {
  description: string | null;
  imageUrl: string | null;
}

export interface CitySummary {
  _id: string;
  name: string | null;
  slug: string | null;
}

export interface City extends CitySummary {
  description: string | null;
  imageUrl: string | null;
  country: CountrySummary | null;
}

export interface AttractionSummary {
  _id: string;
  name: string | null;
  slug: string | null;
  imageUrl: string | null;
}

export interface Attraction extends AttractionSummary {
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  city: CitySummary | null;
}

export interface CityDetail extends City {
  attractions: AttractionSummary[];
}
