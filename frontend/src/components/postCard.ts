import { Post, PublicUser } from "../api/api";
import { getAvatarUrl } from "../utils/avatar";
import { escapeHtml, formatDate } from "./message";

export function postCard(post: Post, currentUser: PublicUser | null): string {
  const isOwner = currentUser?.id === post.userId;
  const likedByCurrentUser = currentUser ? post.likes.includes(currentUser.id) : false;
  const author = post.author;
  const edited = post.updatedAt !== post.createdAt ? " · redigerad" : "";

  return `
    <article class="post-card" data-post-id="${post.id}">
      <div class="post-meta">
        <a class="avatar-link" href="#/users/${post.userId}">
          <img class="avatar avatar-small" src="${getAvatarUrl(author?.avatar ?? "avatar1.png")}" alt="${escapeHtml(author?.username ?? "Borttagen användare")}" />
        </a>
        <div>
          <a href="#/users/${post.userId}" class="post-author">${escapeHtml(author?.username ?? "Borttagen användare")}</a>
          <p>${formatDate(post.createdAt)}${edited}</p>
        </div>
      </div>
      <h2 class="post-title">${escapeHtml(post.title)}</h2>
      <p class="post-content">${escapeHtml(post.content)}</p>
      <div class="post-actions">
        <button class="secondary-button like-post" data-post-id="${post.id}">${likedByCurrentUser ? "Gillad" : "Gilla"} (${post.likes.length})</button>
        ${isOwner ? `<button class="secondary-button edit-post" data-post-id="${post.id}">Redigera</button><button class="danger-button delete-post" data-post-id="${post.id}">Ta bort</button>` : ""}
      </div>
    </article>
  `;
}
