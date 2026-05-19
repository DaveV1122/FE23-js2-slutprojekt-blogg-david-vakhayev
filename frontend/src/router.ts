import { bindNavbarEvents, renderNavbar } from "./components/navbar";
import { renderHomePage } from "./pages/homePage";
import { bindLoginPage, renderLoginPage } from "./pages/loginPage";
import { bindRegisterPage, renderRegisterPage } from "./pages/registerPage";
import { bindBlogPage, renderBlogPage } from "./pages/blogPage";
import { renderUsersPage } from "./pages/usersPage";
import { getCurrentUser, isLoggedIn } from "./state/authState";

type PageBinding = () => void;

export async function router(): Promise<void> {
  const app = document.querySelector("#app");

  if (!app) {
    return;
  }

  app.innerHTML = `${renderNavbar()}<main id="page" class="container"></main>`;
  bindNavbarEvents();

  const page = document.querySelector("#page");
  const route = window.location.hash.replace("#", "") || "/";
  let html = "";
  let bindPage: PageBinding = () => undefined;

  if (route === "/login") {
    html = renderLoginPage();
    bindPage = bindLoginPage;
  } else if (route === "/register") {
    html = renderRegisterPage();
    bindPage = bindRegisterPage;
  } else if (!isLoggedIn()) {
    window.location.hash = "#/login";
    return;
  } else if (route === "/") {
    html = await renderHomePage();
  } else if (route === "/users") {
    html = await renderUsersPage();
  } else if (route === "/me") {
    const user = getCurrentUser();

    if (!user) {
      window.location.hash = "#/login";
      return;
    }

    html = await renderBlogPage(user.id);
    bindPage = () => bindBlogPage(user.id);
  } else if (route.startsWith("/users/")) {
    const userId = route.split("/")[2];
    html = await renderBlogPage(userId);
    bindPage = () => bindBlogPage(userId);
  } else {
    html = `
      <section class="panel">
        <h1>Sidan hittades inte</h1>
        <p>Kontrollera adressen eller gå tillbaka till <a href="#/">blogglistan</a>.</p>
      </section>
    `;
  }

  page!.innerHTML = html;
  bindPage();
}
