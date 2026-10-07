import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LikesContext } from "./LikesContext";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "../hooks/useTranslation";
import { addLikeRequest, getLikesRequest, removeLikeRequest } from "../utils/likesApi";
import type { ProviderProps } from "./ThemeModeProvider";

type LoadedLikes = {
  userId: number;
  attractionIds: string[];
};

export const LikesProvider = ({ children }: ProviderProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const userId = user?.id ?? null;
  const [loaded, setLoaded] = useState<LoadedLikes | null>(null);
  const pendingLikeRef = useRef<string | null>(null);

  const likeAfterLogin = (attractionId: string | null) => {
    pendingLikeRef.current = attractionId;
  };

  useEffect(() => {
    if (userId === null) return;
    let cancelled = false;

    const fetchLikes = async () => {
      const pendingId = pendingLikeRef.current;
      if (pendingId !== null) {
        pendingLikeRef.current = null;
        await addLikeRequest(userId, pendingId);
        toast.success(t.favorites.added);
      }

      const attractionIds = await getLikesRequest(userId);
      if (!cancelled) setLoaded({ userId, attractionIds });
    };

    fetchLikes();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const likedAttractionIds = loaded && loaded.userId === userId ? loaded.attractionIds : [];
  const isLoading = userId !== null && loaded?.userId !== userId;

  const isLiked = (attractionId: string) => likedAttractionIds.includes(attractionId);

  const toggleLike = async (attractionId: string) => {
    if (userId === null) return false;
    const liked = isLiked(attractionId);

    try {
      if (liked) {
        await removeLikeRequest(userId, attractionId);
      } else {
        await addLikeRequest(userId, attractionId);
      }

      setLoaded((current) =>
        current && current.userId === userId
          ? {
              userId,
              attractionIds: liked
                ? current.attractionIds.filter((id) => id !== attractionId)
                : [...current.attractionIds, attractionId],
            }
          : current,
      );
      return true;
    } catch {
      return false;
    }
  };

  return (
    <LikesContext.Provider
      value={{ likedAttractionIds, isLoading, isLiked, toggleLike, likeAfterLogin }}
    >
      {children}
    </LikesContext.Provider>
  );
};
