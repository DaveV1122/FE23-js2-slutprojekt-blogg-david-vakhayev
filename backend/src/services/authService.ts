import { createId, readDb, writeDb } from "../utils/db";
import { allowedAvatars, createHttpError, isNonEmptyString, normalizeUsername, toPublicUser } from "../utils/validation";

export async function registerUser(usernameValue: unknown, passwordValue: unknown, avatarValue: unknown, descriptionValue: unknown) {
  if (!isNonEmptyString(usernameValue) || !isNonEmptyString(passwordValue) || !isNonEmptyString(descriptionValue)) {
    throw createHttpError("Användarnamn, lösenord och beskrivning krävs.");
  }

  const username = normalizeUsername(usernameValue);
  const password = passwordValue.trim();
  const avatar = isNonEmptyString(avatarValue) && allowedAvatars.includes(avatarValue) ? avatarValue : allowedAvatars[0];
  const description = descriptionValue.trim();

  if (username.length < 3) {
    throw createHttpError("Användarnamnet måste vara minst 3 tecken.");
  }

  if (password.length < 4) {
    throw createHttpError("Lösenordet måste vara minst 4 tecken.");
  }

  if (description.length < 10) {
    throw createHttpError("Beskrivningen måste vara minst 10 tecken.");
  }

  const db = await readDb();
  const usernameExists = db.users.some((user) => normalizeUsername(user.username) === username);

  if (usernameExists) {
    throw createHttpError("Användarnamnet är redan upptaget.", 409);
  }

  const user = {
    id: createId("user"),
    username,
    password,
    avatar,
    description,
    createdAt: new Date().toISOString()
  };

  db.users.push(user);
  await writeDb(db);

  return toPublicUser(user);
}

export async function loginUser(usernameValue: unknown, passwordValue: unknown) {
  if (!isNonEmptyString(usernameValue) || !isNonEmptyString(passwordValue)) {
    throw createHttpError("Användarnamn och lösenord krävs.");
  }

  const username = normalizeUsername(usernameValue);
  const password = passwordValue.trim();
  const db = await readDb();
  const user = db.users.find((currentUser) => normalizeUsername(currentUser.username) === username && currentUser.password === password);

  if (!user) {
    throw createHttpError("Fel användarnamn eller lösenord.", 401);
  }

  return toPublicUser(user);
}
