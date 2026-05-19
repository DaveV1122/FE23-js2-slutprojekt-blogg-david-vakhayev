import { api } from "../api/api";
import { messageHtml } from "../components/message";
import { setCurrentUser } from "../state/authState";
import { avatarOptions, getAvatarUrl } from "../utils/avatar";

export function renderRegisterPage(message = ""): string {
  return `
    <section class="panel narrow-panel">
      <h1>Registrera konto</h1>
      ${messageHtml(message, "error")}
      <form id="registerForm" class="stack">
        <label>Användarnamn<input name="username" autocomplete="username" required minlength="3" /></label>
        <label>Lösenord<input name="password" type="password" autocomplete="new-password" required minlength="4" /></label>
        <label>Beskrivning av bloggen<textarea name="description" required minlength="10" rows="4"></textarea></label>
        <fieldset>
          <legend>Välj avatar</legend>
          <div class="avatar-picker">
            ${avatarOptions
              .map(
                (avatar, index) => `
                  <label class="avatar-option">
                    <input type="radio" name="avatar" value="${avatar}" ${index === 0 ? "checked" : ""} />
                    <span class="avatar-choice">
                      <img class="avatar avatar-large" src="${getAvatarUrl(avatar)}" alt="Avatar ${index + 1}" />
                    </span>
                  </label>
                `
              )
              .join("")}
          </div>
        </fieldset>
        <button type="submit">Skapa konto</button>
      </form>
      <p>Har du redan konto? <a href="#/login">Logga in</a>.</p>
    </section>
  `;
}

export function bindRegisterPage(): void {
  document.querySelector("#registerForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await api.register(String(data.get("username")), String(data.get("password")), String(data.get("avatar")), String(data.get("description")));
      setCurrentUser(response.user);
      window.location.hash = "#/me";
    } catch (error) {
      document.querySelector("#page")!.innerHTML = renderRegisterPage((error as Error).message);
      bindRegisterPage();
    }
  });
}
