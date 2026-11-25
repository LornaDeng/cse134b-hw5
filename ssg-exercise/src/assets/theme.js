(() => {
  const root = document.documentElement;
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;
  let theme = "light";
  try { theme = localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light"; } catch {}
  const apply = () => { root.dataset.theme = theme; button.setAttribute("aria-pressed", String(theme === "dark")); button.textContent = theme === "dark" ? "Switch to light theme" : "Switch to dark theme"; };
  apply();
  button.addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; apply(); try { localStorage.setItem("portfolio-theme", theme); } catch {} });
})();
