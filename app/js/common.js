var $window = $("#main");
var $document = $(document);
var $navButtons = $("button");

var $navGoPrev = $(".go-prev");
var $navGoNext = $(".go-next");
var $slidesContainer = $(".slides-container");
var $slides = $(".slide");
var $currentSlide = $slides.first();
const pageHeight = $window.innerHeight();

AOS.init({
  easing: "ease-in",
  duration: 1000,
  // disable: "mobile",
});

function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

$("#boss-item--slider").owlCarousel({
  dots: true,
  // margin: 20,
  loop: false,
  center: true,
  lazyload: true,
});

$("#products--slider").owlCarousel({
  items: 1,
  dots: true,
  stagePadding: 300,
  margin: 140,
});

$("#teamSwiper").owlCarousel({
  items: 3,
  dots: true,
  loop: false,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
});

// HAMBURGER
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

// HAMBURGER END
