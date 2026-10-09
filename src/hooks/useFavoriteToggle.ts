import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./useAuth";
import { useLikes } from "./useLikes";
import { useTranslation } from "./useTranslation";
import { usePaths } from "./usePaths";

export const useFavoriteToggle = (attractionId: string) => {
  const { user } = useAuth();
  const { isLiked, toggleLike } = useLikes();
  const { t } = useTranslation();
  const paths = usePaths();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, setIsPending] = useState(false);
  const liked = isLiked(attractionId);

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

    if (!success) toast.error(t.favorites.updateFailed);
    else toast.success(liked ? t.favorites.removed : t.favorites.added);
  };

  return { liked, isPending, handleClick };
};
