import { MOCK_USERS } from "../data/users";
import type { AuthResponse } from "../types";


const SESSION_KEY = "auth-session";
const DELAY_MS = 600;

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

export const loginRequest = async (
  email: string,
  password: string,
): Promise<AuthResponse | null> => {
  await delay();

  const match = MOCK_USERS.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  );
  if (!match) return null;

  const { password: _password, ...user } = match;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user.id));
  } catch {}
  return { user };
};

export const refreshRequest = async (): Promise<AuthResponse | null> => {
  try {
    const userId = JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null");
    const match = MOCK_USERS.find((user) => user.id === userId);
    if (!match) return null;

    const { password: _password, ...user } = match;
    return { user };
  } catch {
    return null;
  }
};

export const logoutRequest = async () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
};
