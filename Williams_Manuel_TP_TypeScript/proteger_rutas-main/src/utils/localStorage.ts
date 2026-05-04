import type { IUser } from "../types/IUser";

const USERS_KEY = "users";
const SESSION_KEY = "userData";

export const getUsers = (): IUser[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: IUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const saveSession = (user: IUser) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const getSession = (): IUser | null => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};