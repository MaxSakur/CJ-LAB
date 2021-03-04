var $window = $("#main");
var $document = $(document);
var $navButtons = $("button");

var $navGoPrev = $(".go-prev");
var $navGoNext = $(".go-next");
var $slidesContainer = $(".slides-container");
var $slides = $(".slide");
var $currentSlide = $slides.first();
const pageHeight = $window.innerHeight();

window.addEventListener("touchstart", (e) => {
  // is not near edge of view, exit
  if (e.pageX > 10 && e.pageX < window.innerWidth - 10) return;

  // prevent swipe to navigate gesture
  e.preventDefault();
});

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
  responsive: {
    320: {
      stagePadding: 20,
      margin: 20,
    },
    520: {
      stagePadding: 100,
      margin: 80,
    },
    980: {
      stagePadding: 300,
      margin: 140,
    },
  },
});

$("#teamSwiper").owlCarousel({
  items: 3,
  dots: true,
  loop: false,
  autoHeight: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    420: {
      items: 1,
    },
    560: {
      items: 2,
    },
    780: {
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
