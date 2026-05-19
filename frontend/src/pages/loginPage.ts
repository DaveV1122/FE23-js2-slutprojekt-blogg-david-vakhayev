import { api } from "../api/api";
import { setCurrentUser } from "../state/authState";
import { messageHtml } from "../components/message";

export function renderLoginPage(message = ""): string {
  return `
    <section class="panel narrow-panel">
      <h1>Logga in</h1>
      ${messageHtml(message, "error")}
      <form id="loginForm" class="stack">
        <label>Användarnamn<input name="username" autocomplete="username" required /></label>
        <label>Lösenord<input name="password" type="password" autocomplete="current-password" required /></label>
        <button type="submit">Logga in</button>
      </form>
      <p>Inget konto? <a href="#/register">Registrera dig</a>.</p>
    </section>
  `;
}

export function bindLoginPage(): void {
  document.querySelector("#loginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await api.login(String(data.get("username")), String(data.get("password")));
      setCurrentUser(response.user);
      window.location.hash = "#/";
    } catch (error) {
      document.querySelector("#page")!.innerHTML = renderLoginPage((error as Error).message);
      bindLoginPage();
    }
  });
}
