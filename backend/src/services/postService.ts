import { Post, PostWithAuthor } from "../types";
import { createId, readDb, writeDb } from "../utils/db";
import { createHttpError, isNonEmptyString, toPublicUser } from "../utils/validation";

function getPostWithAuthor(post: Post, db: Awaited<ReturnType<typeof readDb>>): PostWithAuthor {
  const author = db.users.find((user) => user.id === post.userId);

  return {
    ...post,
    author: author ? toPublicUser(author) : null
  };
}

export async function getUserPosts(userId: string) {
  const db = await readDb();
  const user = db.users.find((currentUser) => currentUser.id === userId);

  if (!user) {
    throw createHttpError("Användaren finns inte.", 404);
  }

  return db.posts
    .filter((post) => post.userId === userId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((post) => getPostWithAuthor(post, db));
}

export async function addPost(blogUserId: string, requesterIdValue: unknown, titleValue: unknown, contentValue: unknown) {
  if (!isNonEmptyString(requesterIdValue) || !isNonEmptyString(titleValue) || !isNonEmptyString(contentValue)) {
    throw createHttpError("Inloggad användare, titel och innehåll krävs.");
  }

  if (requesterIdValue !== blogUserId) {
    throw createHttpError("Du kan bara skapa inlägg på din egen blogg.", 403);
  }

  const db = await readDb();
  const user = db.users.find((currentUser) => currentUser.id === blogUserId);

  if (!user) {
    throw createHttpError("Användaren finns inte.", 404);
  }

  const now = new Date().toISOString();
  const post: Post = {
    id: createId("post"),
    userId: user.id,
    title: titleValue.trim(),
    content: contentValue.trim(),
    likes: [],
    createdAt: now,
    updatedAt: now
  };

  db.posts.push(post);
  await writeDb(db);

  return getPostWithAuthor(post, db);
}

export async function editPost(postId: string, requesterIdValue: unknown, titleValue: unknown, contentValue: unknown) {
  if (!isNonEmptyString(requesterIdValue) || !isNonEmptyString(titleValue) || !isNonEmptyString(contentValue)) {
    throw createHttpError("Inloggad användare, titel och innehåll krävs.");
  }

  const db = await readDb();
  const post = db.posts.find((currentPost) => currentPost.id === postId);

  if (!post) {
    throw createHttpError("Inlägget finns inte.", 404);
  }

  if (post.userId !== requesterIdValue) {
    throw createHttpError("Du kan bara redigera dina egna inlägg.", 403);
  }

  post.title = titleValue.trim();
  post.content = contentValue.trim();
  post.updatedAt = new Date().toISOString();
  await writeDb(db);

  return getPostWithAuthor(post, db);
}

export async function deletePost(postId: string, requesterIdValue: unknown) {
  if (!isNonEmptyString(requesterIdValue)) {
    throw createHttpError("Du måste vara inloggad.", 401);
  }

  const db = await readDb();
  const post = db.posts.find((currentPost) => currentPost.id === postId);

  if (!post) {
    throw createHttpError("Inlägget finns inte.", 404);
  }

  if (post.userId !== requesterIdValue) {
    throw createHttpError("Du kan bara ta bort dina egna inlägg.", 403);
  }

  db.posts = db.posts.filter((currentPost) => currentPost.id !== postId);
  await writeDb(db);
}

export async function togglePostLike(postId: string, requesterIdValue: unknown) {
  if (!isNonEmptyString(requesterIdValue)) {
    throw createHttpError("Du måste vara inloggad för att gilla.");
  }

  const db = await readDb();
  const user = db.users.find((currentUser) => currentUser.id === requesterIdValue);
  const post = db.posts.find((currentPost) => currentPost.id === postId);

  if (!user) {
    throw createHttpError("Användaren finns inte.", 401);
  }

  if (!post) {
    throw createHttpError("Inlägget finns inte.", 404);
  }

  const alreadyLiked = post.likes.includes(user.id);
  post.likes = alreadyLiked ? post.likes.filter((id) => id !== user.id) : [...post.likes, user.id];
  await writeDb(db);

  return getPostWithAuthor(post, db);
}
