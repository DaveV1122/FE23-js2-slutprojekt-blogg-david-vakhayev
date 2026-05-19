import { PublicUser } from "../api/api";

const storageKey = "loggedInUser";

export function getCurrentUser(): PublicUser | null {
  const storedUser = localStorage.getItem(storageKey);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as PublicUser;
  } catch {
    localStorage.removeItem(storageKey);
    return null;
  }
}

export function setCurrentUser(user: PublicUser): void {
  localStorage.setItem(storageKey, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(storageKey);
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
