const indexHamburger = document.getElementById("index-hamburger");

function classListValue(value, clicked) {
  document.getElementById("index-hamburger").classList = value;
  document.getElementById("index-hamburger-menu").classList = clicked
    ? "closed"
    : "shown";
}

indexHamburger.addEventListener("click", () => {
  let hamburgerStatus = indexHamburger.classList.value;
  if (hamburgerStatus.search("pressed") === -1) {
    classListValue("hamburger pressed", false);
  } else {
    classListValue("hamburger", true);
  }
});

// SWIPER INIT + SET OPTIONS ON INITIAL START
const teamSwiper = new Swiper(".teamSwiper", {
  //   direction: "vertical",
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 1000,
  mousewheel: true,
  effect: "fade",
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  // navigation: {
  //   nextEl: "#next-button",
  //   prevEl: "#prev-button",
  // },
  on: () => console.log("12"),
});
