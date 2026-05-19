import { api } from "../api/api";
import { postCard } from "../components/postCard";
import { escapeHtml, formatDate, messageHtml } from "../components/message";
import { clearCurrentUser, getCurrentUser } from "../state/authState";
import { getAvatarUrl } from "../utils/avatar";

type MessageType = "success" | "error";

export async function renderBlogPage(userId: string, message = "", messageType: MessageType = "success"): Promise<string> {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.hash = "#/login";
    return "";
  }

  try {
    const [profile, posts] = await Promise.all([api.getUser(userId), api.getUserPosts(userId)]);
    const isOwnBlog = currentUser.id === profile.user.id;

    return `
      <section class="blog-layout">
        <aside class="profile-card">
          <img class="avatar avatar-large" src="${getAvatarUrl(profile.user.avatar)}" alt="${escapeHtml(profile.user.username)}" />
          <h1>${escapeHtml(profile.user.username)}</h1>
          <p>${escapeHtml(profile.user.description)}</p>
          <small>Bloggare sedan ${formatDate(profile.user.createdAt)}</small>
          ${isOwnBlog ? `<button id="deleteAccountButton" class="danger-button">Ta bort mitt konto</button>` : ""}
        </aside>
        <div>
          <div class="page-heading">
            <a href="#/">Tillbaka till användare</a>
            <h1>${isOwnBlog ? "Min blogg" : `${escapeHtml(profile.user.username)}s blogg`}</h1>
          </div>
          ${messageHtml(message, messageType)}
          ${
            isOwnBlog
              ? `
                <form id="postForm" class="post-form panel">
                  <label>Titel<input name="title" required maxlength="100" /></label>
                  <label>Innehåll<textarea name="content" required rows="5"></textarea></label>
                  <button type="submit">Publicera inlägg</button>
                </form>
              `
              : ""
          }
          <div class="posts-list">
            ${posts.length > 0 ? posts.map((post) => postCard(post, currentUser)).join("") : `<p class="empty-state">Inga inlägg ännu.</p>`}
          </div>
        </div>
      </section>
    `;
  } catch (error) {
    return `
      <section class="panel">
        <h1>Bloggen hittades inte</h1>
        ${messageHtml((error as Error).message, "error")}
        <a href="#/">Gå till användarlistan</a>
      </section>
    `;
  }
}

export function bindBlogPage(userId: string): void {
  const currentUser = getCurrentUser();

  document.querySelector("#postForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    if (!currentUser) {
      window.location.hash = "#/login";
      return;
    }

    try {
      const response = await api.addPost(userId, String(data.get("title")), String(data.get("content")));
      await rerenderBlog(userId, response.message, "success");
    } catch (error) {
      await rerenderBlog(userId, (error as Error).message, "error");
    }
  });

  document.querySelectorAll(".like-post").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!currentUser) {
        window.location.hash = "#/login";
        return;
      }

      try {
        const postId = (button as HTMLButtonElement).dataset.postId ?? "";
        await api.likePost(postId, currentUser.id);
        await rerenderBlog(userId);
      } catch (error) {
        await rerenderBlog(userId, (error as Error).message, "error");
      }
    });
  });

  document.querySelectorAll(".delete-post").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!currentUser) {
        return;
      }

      try {
        const postId = (button as HTMLButtonElement).dataset.postId ?? "";
        const response = await api.deletePost(postId, currentUser.id);
        await rerenderBlog(userId, response.message, "success");
      } catch (error) {
        await rerenderBlog(userId, (error as Error).message, "error");
      }
    });
  });

  document.querySelectorAll(".edit-post").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!currentUser) {
        return;
      }

      const postId = (button as HTMLButtonElement).dataset.postId ?? "";
      const card = document.querySelector(`[data-post-id="${postId}"]`);
      const currentTitle = card?.querySelector(".post-title")?.textContent ?? "";
      const currentContent = card?.querySelector(".post-content")?.textContent ?? "";
      const newTitle = window.prompt("Redigera titel", currentTitle);

      if (!newTitle) {
        return;
      }

      const newContent = window.prompt("Redigera inlägg", currentContent);

      if (!newContent || (newTitle.trim() === currentTitle.trim() && newContent.trim() === currentContent.trim())) {
        return;
      }

      try {
        const response = await api.editPost(postId, currentUser.id, newTitle, newContent);
        await rerenderBlog(userId, response.message, "success");
      } catch (error) {
        await rerenderBlog(userId, (error as Error).message, "error");
      }
    });
  });

  document.querySelector("#deleteAccountButton")?.addEventListener("click", async () => {
    if (!currentUser || currentUser.id !== userId) {
      return;
    }

    const confirmed = window.confirm("Vill du ta bort ditt konto och alla dina blogginlägg?");

    if (!confirmed) {
      return;
    }

    try {
      await api.deleteUser(userId);
      clearCurrentUser();
      window.location.hash = "#/register";
    } catch (error) {
      await rerenderBlog(userId, (error as Error).message, "error");
    }
  });
}

async function rerenderBlog(userId: string, message = "", messageType: MessageType = "success") {
  document.querySelector("#page")!.innerHTML = await renderBlogPage(userId, message, messageType);
  bindBlogPage(userId);
}
