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
        try {
          await addLikeRequest(userId, pendingId);
          toast.success(t.favorites.added);
        } catch {
          toast.error(t.favorites.updateFailed);
        }
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

  const setLike = async (attractionId: string, like: boolean) => {
    if (userId === null) return false;

    try {
      if (like) {
        await addLikeRequest(userId, attractionId);
      } else {
        await removeLikeRequest(userId, attractionId);
      }

      setLoaded((current) =>
        current && current.userId === userId
          ? {
              userId,
              attractionIds: like
                ? [...current.attractionIds.filter((id) => id !== attractionId), attractionId]
                : current.attractionIds.filter((id) => id !== attractionId),
            }
          : current,
      );
      return true;
    } catch {
      return false;
    }
  };

  const toggleLike = (attractionId: string) => setLike(attractionId, !isLiked(attractionId));

  // Explicit, so an undo from an older render can't flip the like back the wrong way
  const addLike = (attractionId: string) => setLike(attractionId, true);

  return (
    <LikesContext.Provider
      value={{ likedAttractionIds, isLoading, isLiked, toggleLike, addLike, likeAfterLogin }}
    >
      {children}
    </LikesContext.Provider>
  );
};
