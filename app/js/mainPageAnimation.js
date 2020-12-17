// UPDATE VERTICAL NAV BUTTON ON LOAD
let activeSwipeIndex = 0;

const downButton = document.getElementById("next-button");
const upButton = document.getElementById("prev-button");

const show = (el) => {
  el.style.display = "flex";
};
const hide = (el) => {
  el.style.display = "none";
};

const handleButtonVisibility = () => {
  const firstCond = activeSwipeIndex === 0;
  const secondCond = activeSwipeIndex === slidersCollection.length - 1;

  if (firstCond) {
    show(downButton);
    hide(upButton);
  }
  if (secondCond) {
    show(upButton);
    hide(downButton);
  } else if (!firstCond && !secondCond) {
    show(upButton);
    show(downButton);
  }
};

document.addEventListener("DOMContentLoaded", handleButtonVisibility);

// // PREPARING ACTIVE SLIDER
const slidersCollection = document.getElementsByClassName("swiper-slide");

const activeItem = `s_item_${activeSwipeIndex}`;

// SWIPER INIT + SET OPTIONS ON INITIAL START
const swiper = new Swiper(".mainPageSwiper", {
  direction: "vertical",
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
  navigation: {
    nextEl: "#next-button",
    prevEl: "#prev-button",
  },
  on: {
    init: function () {
      anime({
        targets: `.s_item_0 .s_item--text`,
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: 0,
        easing: "easeInOutQuad",
        duration: 2000,
      });
      anime({
        targets: `.s_item_0 .s_item--images .round-ovrl`,
        translateX: [400, 0],
        opacity: [0, 1],
        delay: 1000,
        easing: "easeInOutQuad",
        duration: 2000,
      });
    },
  },
});

// SETTINGS PACK

const defaultTextAnimation = () => {
  anime({
    targets: `.s_item_${activeSwipeIndex} .s_item--text .h1`,
    translateX: [-50, 0],
    opacity: [0, 1],
    delay: 0,
    easing: "easeInOutQuad",
    duration: 2000,
  });
  anime({
    targets: `.s_item_${activeSwipeIndex} .s_item--text .index_sub_header`,
    translateX: [-50, 0],
    opacity: [0, 1],
    delay: 500,
    easing: "easeInOutQuad",
    duration: 2000,
  });
};

const ringPhoneBlock = (activeSwipeIndex) => {
  defaultTextAnimation();
  anime({
    targets: `.s_item_${activeSwipeIndex} .s_item--images .round-ovrl`,
    translateX: [400, 0],
    opacity: [0, 1],
    delay: 1000,
    easing: "easeInOutQuad",
    duration: 2000,
  });
};

const handIosImgBlock = (activeSwipeIndex) => {
  defaultTextAnimation();
  anime({
    targets: `.s_item_${activeSwipeIndex} .ios-phone`,
    translateY: [-50, 0],
    opacity: [0, 1],
    delay: 1000,
    easing: "easeInOutQuad",
    duration: 2000,
  });
};

const handPlaneImgBlock = (activeSwipeIndex) => {
  defaultTextAnimation();
  // anime({
  //   targets: `.s_item_${activeSwipeIndex} .s_item--images .plane-dot`,
  //   translateX: [400, 0],
  //   opacity: [0, 1],

  //   delay: 1000,
  //   easing: "easeInOutQuad",
  //   duration: 2000,
  // });
  anime({
    targets: `.s_item_${activeSwipeIndex} .plane`,
    opacity: [0, 1],
    scale: [0.5, 1],
    translateX: [-200, 0],
    translateY: [200, 0],
    delay: 1000,
    easing: "easeInOutQuad",
    duration: 2000,
  });
};

const girlImgBlock = (activeSwipeIndex) => {
  defaultTextAnimation();
  anime({
    targets: `.s_item_${activeSwipeIndex} .girl-overlay`,
    opacity: [0, 1],
    delay: 0,
    easing: "easeInOutQuad",
    duration: 2000,
  });
};

// ON SLIDER CHANGE
swiper.on("slideChange", function () {
  activeSwipeIndex = swiper.activeIndex;
  handleButtonVisibility();
  switch (activeSwipeIndex) {
    case 0:
      ringPhoneBlock(activeSwipeIndex);
      break;
    case 1:
      handIosImgBlock(activeSwipeIndex);
      break;
    case 2:
      handPlaneImgBlock(activeSwipeIndex);
      break;
    case 3:
      girlImgBlock(activeSwipeIndex);
      break;
    default:
      break;
  }
});

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
