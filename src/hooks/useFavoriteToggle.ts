import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./useAuth";
import { useLikes } from "./useLikes";
import { useTranslation } from "./useTranslation";
import { usePaths } from "./usePaths";

// Longer than the default, so there is time to reach the undo button
const UNDO_DURATION_MS = 7000;

export const useFavoriteToggle = (attractionId: string) => {
  const { user } = useAuth();
  const { isLiked, toggleLike, addLike } = useLikes();
  const { t } = useTranslation();
  const paths = usePaths();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, setIsPending] = useState(false);
  const liked = isLiked(attractionId);
  // One toast per attraction, so quick repeat clicks replace it instead of stacking.
  // Sonner merges options into the toast it replaces, so clear the undo button and its duration
  const toastOptions = { id: `favorite-${attractionId}`, action: undefined, duration: undefined };

  const handleClick = async () => {
    if (!user) {
      navigate(paths.login, {
        state: {
          from: location.pathname + location.search,
          likeAttractionId: attractionId,
        },
      });
      return;
    }

    setIsPending(true);
    const success = await toggleLike(attractionId);
    setIsPending(false);

    if (!success) {
      toast.error(t.favorites.updateFailed, toastOptions);
    } else if (liked) {
      toast.success(t.favorites.removed, {
        ...toastOptions,
        duration: UNDO_DURATION_MS,
        action: { label: t.favorites.undo, onClick: undoRemove },
      });
    } else {
      toast.success(t.favorites.added, toastOptions);
    }
  };

  const undoRemove = async () => {
    const success = await addLike(attractionId);
    if (success) toast.success(t.favorites.added, toastOptions);
    else toast.error(t.favorites.updateFailed, toastOptions);
  };

  return { liked, isPending, handleClick };
};
