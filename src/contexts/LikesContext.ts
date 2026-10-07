import { createContext } from "react";

export type LikesContextValue = {
  likedAttractionIds: string[];
  isLoading: boolean;
  isLiked: (attractionId: string) => boolean;
  toggleLike: (attractionId: string) => Promise<boolean>;
  likeAfterLogin: (attractionId: string | null) => void;
};

export const LikesContext = createContext<LikesContextValue | null>(null);
