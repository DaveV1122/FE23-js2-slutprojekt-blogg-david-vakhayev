import { api, PublicUser } from "../api/api";
import { escapeHtml, formatDate, messageHtml } from "../components/message";
import { getAvatarUrl } from "../utils/avatar";

export async function renderHomePage(): Promise<string> {
  try {
    const users = await api.getUsers();

    return `
      <section>
        <div class="page-heading">
          <h1>Bloggar</h1>
          <p>Välj en användare för att läsa personens blogg.</p>
        </div>
        <div class="user-grid">
          ${users.map(userCard).join("")}
        </div>
      </section>
    `;
  } catch (error) {
    return messageHtml((error as Error).message, "error");
  }
}

function userCard(user: PublicUser): string {
  return `
    <a class="user-card" href="#/users/${user.id}">
      <img class="avatar" src="${getAvatarUrl(user.avatar)}" alt="${escapeHtml(user.username)}" />
      <strong>${escapeHtml(user.username)}</strong>
      <p>${escapeHtml(user.description)}</p>
      <small>Bloggare sedan ${formatDate(user.createdAt)}</small>
    </a>
  `;
}
