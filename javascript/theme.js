const themeToggle = document.querySelector(".theme-toggle-btn");
const platformHeadlineImg = document.querySelector(".platform-headline-img");
const statementImg = document.querySelector(".statement-img");

const ICON_LIGHT = "./public/enzy-logo-icon-light.svg";
const ICON_DARK = "./public/enzy-logo-icon-dark.svg";

const swapImage = () => {
  const newSrc = getCurrentTheme() === ICON_LIGHT ? ICON_DARK : ICON_LIGHT;

  setImagesSrc(newSrc);
};

const setImagesSrc = (src) => {
  platformHeadlineImg.setAttribute("src", src);
  statementImg.setAttribute("src", src);
};

const getCurrentTheme = () => statementImg.getAttribute("src");

const applyThemeBasedOnPreference = () => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ICON_LIGHT
    : ICON_DARK;
  setImagesSrc(theme);
};

const toggleTheme = () => {
  document.body.classList.toggle("theme-swap");
  swapImage();
};

themeToggle.addEventListener("click", toggleTheme);

applyThemeBasedOnPreference();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", applyThemeBasedOnPreference);
