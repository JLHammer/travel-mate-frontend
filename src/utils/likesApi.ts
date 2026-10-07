
const LIKES_KEY = "likes";
const DELAY_MS = 300;

type LikesStore = Record<string, string[]>;

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

const readStore = (): LikesStore => {
  try {
    return JSON.parse(localStorage.getItem(LIKES_KEY) ?? "{}");
  } catch {
    return {};
  }
};

const writeLikes = (userId: number, attractionIds: string[]) => {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify({ ...readStore(), [userId]: attractionIds }));
  } catch {}
};

export const getLikesRequest = async (userId: number) => {
  await delay();
  return readStore()[userId] ?? [];
};

export const addLikeRequest = async (userId: number, attractionId: string) => {
  await delay();
  const likes = readStore()[userId] ?? [];
  if (!likes.includes(attractionId)) writeLikes(userId, [...likes, attractionId]);
};

export const removeLikeRequest = async (userId: number, attractionId: string) => {
  await delay();
  const likes = readStore()[userId] ?? [];
  writeLikes(
    userId,
    likes.filter((id) => id !== attractionId),
  );
};
