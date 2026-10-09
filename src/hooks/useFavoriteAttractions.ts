import { FAVORITE_ATTRACTIONS_QUERY } from "../data/queries";
import type { Attraction } from "../types";
import { useLanguage } from "./useLanguage";
import { useLikes } from "./useLikes";
import { useSanityQuery } from "./useSanityQuery";

export const useFavoriteAttractions = () => {
  const { language } = useLanguage();
  const { likedAttractionIds, isLoading: likesLoading } = useLikes();
  const { data, isLoading, error, refetch } = useSanityQuery<Attraction[]>(FAVORITE_ATTRACTIONS_QUERY, {
    ids: likedAttractionIds,
    lang: language,
  });

  return {
    attractions: data?.filter(({ _id }) => likedAttractionIds.includes(_id)) ?? [],
    isLoading: likesLoading || (isLoading && !data),
    error,
    refetch,
  };
};
