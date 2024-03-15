let minMd = window.matchMedia("(min-width: 768px)");

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
  navMenu = document.querySelector(".nav-menu"),
  headerCtaWrapper = document.querySelector(".header-cta-wrapper"),
  menuBtnWrapper = document.querySelector(".menu-btn-wrapper"),
  menuBtn = document.querySelector(".menu-btn"),
  headerCta1 = headerCtaWrapper.querySelector(".cta-1"),
  headerCta2 = headerCtaWrapper.querySelector(".cta-2"),
  vidWrapper = document.querySelector(".video-wrapper"),
  platformHeadline = document.querySelector(".platform-headline");

const fillTextElements = document.querySelectorAll(".animation-fill-text"),
  allDeviceText = document.querySelectorAll(".headline-text-device");

// Header Defaults
menuBtn.setAttribute("tabindex", "-1");

// Video Section Defaults
const vidWrapperOffsetTop = vidWrapper.offsetTop;
const vidWrapperHeight = vidWrapper.offsetHeight;

// Platform Section Defaults
allDeviceText.forEach((textblock) =>
  textblock.setAttribute("aria-hidden", "true")
);

// Fill text animation

const fillTextEffect = (element, offsetTop, elementHeight) => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  const isVisible =
    scrollPosition + windowHeight > offsetTop &&
    scrollPosition < offsetTop + elementHeight;

  if (isVisible) {
    let scrollProgress =
      (scrollPosition + windowHeight - offsetTop - 64) /
      (elementHeight + windowHeight / 16);
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1); // Clamp between 0 and 1
    const backgroundSize = scrollProgress * 100 + "% 100%";
    element.style.backgroundSize = backgroundSize;
  } else if (scrollPosition < offsetTop) {
    element.style.backgroundSize = "0% 100%";
  }
};

//
// All Scroll Animations that require SCRUBBING

const checkScroll = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  // Header/Nav scroll logic
  const isNavOpen = navMenu.classList.contains("menu-active");

  if (scrollPosition >= 24) {
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

  if (scrollPosition < 24 && isNavOpen) {
    menuBtnWrapper.classList.add("menu-wrapper-page-top");
  } else {
    menuBtnWrapper.classList.remove("menu-wrapper-page-top");
  }

  // Text background fill animations

  // Helper function for broken subtext
  function getOffsetTop(elem) {
    let offsetTop = 0;
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop;
      }
    } while ((elem = elem.offsetParent));
    return offsetTop;
  }

  fillTextElements.forEach((elem) => {
    const fillElementOffsetTop = getOffsetTop(elem);

    fillTextEffect(elem, fillElementOffsetTop, elem.offsetHeight);
  });

  // Video visibility
  const isVideoVisible =
    scrollPosition + windowHeight > vidWrapperOffsetTop &&
    scrollPosition < vidWrapperOffsetTop + vidWrapperHeight;

  if (isVideoVisible) {
    let scrollProgress =
      (vidWrapperOffsetTop - scrollPosition + 360) / (windowHeight / 2);
    scrollProgress = Math.min(Math.max(scrollProgress, 0.25), 1); // Change the max() second argument to determine min opacity
    const videoOpacity = scrollProgress;
    vidWrapper.style.opacity = videoOpacity;
  }
};

window.addEventListener("scroll", throttle(checkScroll, 50)); // Throttle checkScroll, adjust 100ms as needed

// Platform Intersection Observer

const platformDeviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const targetId = entry.target.dataset.id;
      const deviceClass = `device-${targetId}`;
      const deviceTextSelector = `.headline-text-device-${targetId}`;
      const deviceTextElement = document.querySelector(deviceTextSelector);

      if (entry.isIntersecting) {
        platformHeadline.classList.add(deviceClass);
        deviceTextElement.setAttribute("aria-hidden", "false");
      } else {
        platformHeadline.classList.remove(deviceClass);
        if (!platformHeadline.classList.contains(deviceClass)) {
          deviceTextElement.setAttribute("aria-hidden", "true");
        }
      }
    });
  },
  {
    root: null, // Viewport
    rootMargin: "0px",
    threshold: window.innerHeight < 580 ? 0.1 : 0.5,
  }
);

document.querySelectorAll(".device-img").forEach((img, index) => {
  img.setAttribute("data-id", index + 1);
  platformDeviceObserver.observe(img);
});

// // Platform Section Scroll Snap
// let allowScrollSnap = true;

// const platformScrollSnap = () => {
//   const deviceImg = document.querySelectorAll(".device-img");

//   const scrollSnapObserver = new IntersectionObserver(
//     (entries, observer) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting && allowScrollSnap) {
//           entry.target.scrollIntoView({
//             behavior: "smooth",
//             block: "center",
//           });
//         }
//       });
//     },
//     {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.5,
//     }
//   );

//   deviceImg.forEach((image) => {
//     scrollSnapObserver.observe(image);
//   });
// };

// // Used for page links and keyboard actions
// const disableScrollSnapTemporarily = () => {
//   allowScrollSnap = false;
//   setTimeout(() => {
//     allowScrollSnap = true;
//   }, 2000);
// };

// const handleSmoothScroll = (e) => {
//   const target = e.target.closest('a[href^="#"]');
//   if (target) {
//     disableScrollSnapTemporarily();
//   }
// };

// const handleTabNavigation = (e) => {
//   if (e.key === "Tab" || e.key === "ArrowDown" || e.key === "ArrowUp") {
//     disableScrollSnapTemporarily();
//   }
// };

// const watchQueryMd = (e) => {
//   if (e.matches) {
//     document.addEventListener("click", handleSmoothScroll);
//     document.addEventListener("keydown", handleTabNavigation);
//     window.addEventListener("scroll", throttle(platformScrollSnap, 500));
//   }
// };

// minMd.addEventListener("change", watchQueryMd);

// watchQueryMd(minMd);
// End Platform Scroll

// Section headline scroll animation

const scrollAnimateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-animate");
    } else {
      entry.target.classList.remove("scroll-animate");
    }
  });
});

document.querySelectorAll(".animate-on-scroll").forEach((elem) => {
  scrollAnimateObserver.observe(elem);
});
