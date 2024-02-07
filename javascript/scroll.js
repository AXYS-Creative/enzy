let mqMinlg = window.matchMedia("(min-width: 1024px)");
// let mqMaxSm = window.matchMedia("(max-width: 480px)");
// let mqMouse = window.matchMedia("(hover: hover)");

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const siteHeader = document.querySelector(".site-header"),
  headerCtaWrapper = document.querySelector(".header-cta-wrapper"),
  menuBtn = document.querySelector(".menu-btn"),
  headerCta1 = headerCtaWrapper.querySelector(".cta-1"),
  headerCta2 = headerCtaWrapper.querySelector(".cta-2");

const navMenu = document.querySelector(".nav-menu");
const isNavOpen = navMenu.classList.contains("active");

if (mqMinlg.matches) {
  menuBtn.setAttribute("tabindex", "-1");

  const toggleClassOnScroll = () => {
    const checkScroll = () => {
      if (window.scrollY >= 24 && !isNavOpen) {
        siteHeader.classList.add("scroll-active");
        headerCtaWrapper.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-hidden", "false");
        menuBtn.removeAttribute("tabindex");
        headerCta1.setAttribute("tabindex", "-1");
        headerCta2.setAttribute("tabindex", "-1");
      } else {
        siteHeader.classList.remove("scroll-active");
        headerCtaWrapper.setAttribute("aria-hidden", "false");
        menuBtn.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("tabindex", "-1");
        headerCta1.removeAttribute("tabindex");
        headerCta2.removeAttribute("tabindex");
      }
    };

    window.addEventListener("scroll", throttle(checkScroll, 100)); // Throttle checkScroll, adjust 100ms as needed
  };

  toggleClassOnScroll();
}
