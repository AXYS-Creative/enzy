const themeToggle = document.querySelector(".theme-toggle-btn");

const toggleTheme = () => {
  document.body.classList.toggle("theme-swap");
};

themeToggle.addEventListener("click", toggleTheme);
