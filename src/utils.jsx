import AOS from "aos";
import "aos/dist/aos.css";


export const stickyNav = () => {
  let offset = window.scrollY;
  const stickys = document.querySelectorAll("#header-sticky");
  for (let i = 0; i < stickys.length; i++) {
    const sticky = stickys[i];
    if (sticky) {
      if (offset > 60) {
        sticky.classList.add("sticky-on");
      } else {
        sticky.classList.remove("sticky-on");
      }
    }
  }
};

export const animation = () => {
  if (typeof window !== "undefined") {
    AOS.init({
      once: true, // animate only once on scroll
      duration: 600, // global animation duration
      easing: "ease-out", // global easing
    });
  }
};

// export const animation = async () => {
//   if (
//     typeof window !== "undefined" &&
//     typeof MutationObserver !== "undefined"
//   ) {
//     const { WOW } = await import("wowjs");
//     window.WOW = WOW;

//     try {
//       new WOW({ live: false }).init(); // 💡 disables DOM mutation watching
//     } catch (err) {
//       console.warn("WOW.js init error:", err);
//     }
//   } else {
//     console.warn("WOW.js not initialized: MutationObserver not supported.");
//   }
// };
export const aTagClick = () => {
  const aTag = document.querySelectorAll("[href='#']");
  for (let i = 0; i < aTag.length; i++) {
    const a = aTag[i];
    a.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
};
export const activeNavMenu = (path) => {
  const navItem = document.querySelectorAll("#menu li a");
  navItem.forEach((nav) => {
    if (nav.pathname === path) {
      if (!nav.href.includes("#")) {
        if (nav.pathname === "/events" || nav.pathname === "/contact") {
          nav.parentElement.className = "current";
        } else {
          nav.parentElement.parentElement.parentElement.className = "current";
        }
      }
    }
  });
};
export const dataPoggress = () => {
  const bars = document.querySelectorAll(".stats-bar");
  bars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    const barLines = bar.getElementsByClassName("bar-line");
    barLines[0].style.width = `${value}%`;
  });
};
export const pagination = (listClass, sort, active) => {
  let list = document.querySelectorAll(listClass);
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (active === 1) {
      if (i < sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    } else {
      if (i >= (active - 1) * sort && i < active * sort) {
        element.classList.remove("d-none");
      } else {
        element.classList.add("d-none");
      }
    }
  }
};

export const getPagination = (totalNumber, sort) => {
  let arr = new Array(Math.ceil(totalNumber / sort))
    .fill()
    .map((_, idx) => idx + 1);
  return arr;
};

