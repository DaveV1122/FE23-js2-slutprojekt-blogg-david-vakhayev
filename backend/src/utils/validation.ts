import { PublicUser, User } from "../types";

export const allowedAvatars = ["avatar1.png", "avatar2.png", "avatar3.png"];

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    description: user.description,
    createdAt: user.createdAt
  };
}

export function createHttpError(message: string, statusCode = 400): Error & { statusCode: number } {
  return Object.assign(new Error(message), { statusCode });
}
