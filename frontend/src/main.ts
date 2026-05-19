import { router } from "./router";
import "./styles.css";

window.addEventListener("hashchange", () => {
  void router();
});

window.addEventListener("DOMContentLoaded", () => {
  void router();
});
