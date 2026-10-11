import type { User } from "../types";

type MockUser = User & { password: string };

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    firstName: "Demo",
    lastName: "Traveller",
    email: "demo@example.com",
    password: "travelmate123",
  },
];

export const DEMO_LOGIN = {
  email: MOCK_USERS[0].email,
  password: MOCK_USERS[0].password,
};
