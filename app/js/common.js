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
});

function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

$("#boss-item--slider").owlCarousel({
  dots: true,
  margin: 20,
  loop: false,
  lazyload: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});

const callback = (e) => {
  const currentSlideIndex = e.item.index;
  const currentItem = document.getElementById(
    products_item - `${currentSlideIndex + 1}`
  );
  for (let i = 0; i <= 2; i++) {
    const itemChilden = currentItem.children[i];
    itemChilden.setAttribute("data-aos", "fade-left");

    itemChilden && itemChilden.hasAttribute("data-aos")
      ? itemChilden.setAttribute("data-aos", "fade-left")
      : itemChilden.removeAttribute("data-aos");
  }
};

$("#products--slider").owlCarousel({
  items: 1,
  dots: true,
  stagePadding: 400,
  margin: 180,
  onDragged: callback,
});

$(function () {
  $(".owl-carousel").owlCarousel({
    margin: 10,
    loop: true,
    items: 4,
    stagePadding: 100,
  });
});

$("#carouselBrands").owlCarousel({
  items: 5,
  dots: false,
  center: true,
  autoplay: true,
  lazyload: true,
  autoplaySpeed: 1000,
  autoplayTimeout: 4000,
  loop: true,
});

$("#carouselPhotos").owlCarousel({
  items: 1,
  dots: false,
  loop: true,
  nav: true,
});

//Animating flag - is our app animating
var isAnimating = false;

//Key codes for up and down arrows on keyboard. We'll be using this to navigate change slides using the keyboard
var keyCodes = {
  UP: 38,
  DOWN: 40,
};

//Going to the first slide
goToSlide($currentSlide);

/*
 *   Adding event listeners
 * */

$window.on("resize", onResize).resize();
$window.on("mousewheel DOMMouseScroll ", onMouseWheel);
$document.on("keydown", onKeyDown);
$navButtons.on("click", onNavButtonClick);
$navGoPrev.on("click", goToPrevSlide);
$navGoNext.on("click", goToNextSlide);

var self = this;

/*
 *   When a button is clicked - first get the button href, and then slide to the container, if there's such a container
 * */
function onNavButtonClick(event) {
  //The clicked button
  var $button = $(this);

  //The slide the button points to
  var $slide = $($button.attr("href"));

  //If the slide exists, we go to it
  if ($slide.length) {
    goToSlide($slide);
    event.preventDefault();
  }
}

/*
 *   Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
 *   This way, if there's text input, the user is still able to fill it
 * */
function onKeyDown(event) {
  var PRESSED_KEY = event.keyCode;

  if (PRESSED_KEY == keyCodes.UP) {
    goToPrevSlide();
    event.preventDefault();
  } else if (PRESSED_KEY == keyCodes.DOWN) {
    goToNextSlide();
    event.preventDefault();
  }
}

/*
 *   When user scrolls with the mouse, we have to change slides
 * */
function onMouseWheel(event) {
  //Normalize event wheel delta
  var delta =
    event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

  //If the user scrolled up, it goes to previous slide, otherwise - to next slide
  if (delta < -1) {
    goToNextSlide();
  } else if (delta > 1) {
    goToPrevSlide();
  }

  //event.preventDefault();
}

let slideCount = 0;
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
// Initial state
// prevButton.style.display = "none";

function goToNextSlide() {
  if ($currentSlide.next().length) {
    slideCount++;
    changeLogoColor(slideCount);
    delay(goToSlide($currentSlide.next()), 2000);

    prevButton.style.display = "flex";
    if (slideCount === $slides.length - 1) {
      nextButton.style.display = "none";
    }
  }
}

function goToPrevSlide() {
  if ($currentSlide.prev().length) {
    slideCount--;
    changeLogoColor(slideCount);
    delay(goToSlide($currentSlide.prev()), 2000);

    nextButton.style.display = "flex";
    if (slideCount === 0) {
      prevButton.style.display = "none";
    }
  }
}

function changeLogoColor(count) {
  const aliquot2 = count % 2;
  // $("#logo").attr("class", aliquot2 ? "logo_dark" : "logo");
  const condition = $slides.length === count + 1;
  const sidebarBgColor = condition ? "#fff" : "transparent";
  $("section.sidebar").attr("style", `background-color: ${sidebarBgColor}`);
  $("#terms").attr("style", `display: ${condition ? "block" : "none"}`);
  // $("#aside").attr("class", `${aliquot2 ? "checked" : ""}`);
}

/*
 *   Actual transition between slides
 * */
function goToSlide($slide) {
  //If the slides are not changing and there's such a slide
  if (!isAnimating && $slide.length) {
    //setting animating flag to true
    isAnimating = true;

    $currentSlide = $slide;

    // current button
    $currentID = $currentSlide.attr("id");
    $currentButton = $navButtons.filter("." + $currentID);

    //FADING
    TweenLite.fromTo(
      $slidesContainer,
      1,
      {
        autoAlpha: 0.6,
      },
      {
        autoAlpha: 1,
        ease: "elastic",
        duration: 2,
      }
    );

    //Sliding to current slide
    TweenLite.to($slidesContainer, 0, {
      scrollTo: {
        y: pageHeight * $currentSlide.index(),
      },
      onComplete: onSlideChangeEnd,
      onCompleteScope: this,
    });

    //Animating menu items
    $navButtons.removeClass("active");
    $currentButton.addClass("active");
  }
}

/*
 *   Once the sliding is finished, we need to restore "isAnimating" flag.
 *   You can also do other things in this function, such as changing page title
 * */
function onSlideChangeEnd() {
  isAnimating = false;
}

/*
 *   When user resize it's browser we need to know the new height, so we can properly align the current slide
 * */
function onResize(event) {
  //This will give us the new height of the window
  var newPageHeight = $window.innerHeight();

  /*
   *   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
   * */
  if (pageHeight !== newPageHeight) {
    pageHeight = newPageHeight;

    //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
    TweenLite.set([$slidesContainer, $slides], {
      height: pageHeight + "px",
    });

    //The current slide should be always on the top
    TweenLite.set($slidesContainer, {
      scrollTo: {
        y: pageHeight * $currentSlide.index(),
      },
    });
  }
}

const indexHamburger = document.getElementById("index-hamburger");

function classListValue(value, clicked) {
  document.getElementById("index-hamburger").classList = value;
  document.getElementById("index-hamburger-menu").classList = clicked
    ? "closed"
    : "shown";
}

const hamburger = document.getElementsByClassName("hamburger");
console.log(hamburger, "HAMBURGER");
for (let i = 0; i < hamburger.length; i++) {
  console.log("i", i);
  // hamburger[i].onClick = () => {
  //   console.log("this is i =>", i);
  // };
}

indexHamburger.addEventListener("click", () => {
  let hamburgerStatus = indexHamburger.classList.value;
  if (hamburgerStatus.search("pressed") === -1) {
    classListValue("hamburger pressed", false);
  } else {
    classListValue("hamburger", true);
  }
});

const langButton = document.getElementById("lang");

langButton.addEventListener("click", () => {
  let langButtonStatus = langButton.classList.value;

  function classListChange(value) {
    langButton.classList = value;
  }

  if (langButtonStatus.search("open") === -1) {
    classListChange("open");
    console.log("1");
  } else {
    classListChange("close");
    console.log("2");
  }
});

// NEW EMPLEMENTATION OF SLIDER ANIMATION

let pageCount = 0;
const scrollToAction = () => window.scrollTo(100, pageHeight * pageCount);
const bluringCurrentSliderItem = () => {
  $(`.fullpage--slider:eq(${pageCount})`).css("filter", "blur(3px)");
};

$window.on("mousewheel DOMMouseScroll", (event) => {
  const delta =
    event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

  if (delta < -1) {
    bluringCurrentSliderItem();
    pageCount++;
    scrollToAction(pageCount);
  } else if (delta > 1) {
    bluringCurrentSliderItem();
    pageCount--;
    scrollToAction(pageCount);
  }
});

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "38") {
    bluringCurrentSliderItem();
    // up arrow
    pageCount--;
    scrollToAction(pageCount);
  } else if (e.keyCode == "40") {
    bluringCurrentSliderItem();
    // down arrow
    pageCount++;
    scrollToAction(pageCount);
  }
}

// SWIPING EVENT END

// TOGGLE FOR HAMBURGER
const pageID = document.getElementById("products");
if (pageID) {
  const owl = $(".owl-carousel");
  owl.owlCarousel();
  document.getElementById("products").addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }

    if (event.keyCode === 39) {
      owl.trigger("next.owl.carousel");
    }
    if (event.keyCode === 37) {
      owl.trigger("prev.owl.carousel", [300]);
    }
    return event;
  });

  // SWIPING EVENT
  window.onload = function () {
    (function (d) {
      var ce = function (e, n) {
          var a = document.createEvent("CustomEvent");
          a.initCustomEvent(n, true, true, e.target);
          e.target.dispatchEvent(a);
          a = null;
          return false;
        },
        nm = true,
        sp = {
          x: 0,
          y: 0,
        },
        ep = {
          x: 0,
          y: 0,
        },
        touch = {
          touchstart: function (e) {
            sp = {
              x: e.touches[0].pageX,
              y: e.touches[0].pageY,
            };
          },
          touchmove: function (e) {
            nm = false;
            ep = {
              x: e.touches[0].pageX,
              y: e.touches[0].pageY,
            };
          },
          touchend: function (e) {
            if (nm) {
              ce(e, "fc");
            } else {
              var x = ep.x - sp.x,
                xr = Math.abs(x),
                y = ep.y - sp.y,
                yr = Math.abs(y);
              if (Math.max(xr, yr) > 20) {
                ce(
                  e,
                  xr > yr ? (x < 0 ? "swl" : "swr") : y < 0 ? "swu" : "swd"
                );
              }
            }
            nm = true;
          },
          touchcancel: function (e) {
            nm = false;
          },
        };
      for (var a in touch) {
        d.addEventListener(a, touch[a], false);
      }
    })(document);
    //EXAMPLE OF USE
    const hadnleswipeLeft = function (e) {
      owl.trigger("next.owl.carousel");
    };
    const hadnleswipeRight = function (e) {
      owl.trigger("prev.owl.carousel", [300]);
    };

    document.body.addEventListener("swl", hadnleswipeLeft, false);
    document.body.addEventListener("swr", hadnleswipeRight, false);
  };
  document.getElementById("index-hamburger").addEventListener("click", () => {
    const hamburger = document.getElementById("index-hamburger");
    const filter = "pressed";
    if (hamburger.classList.contains(filter)) {
      $(".carousel").css("z-index", -1);
    } else {
      $(".carousel").css("z-index", 1);
    }
  });
} else {
  console.log(pageID, "pageID");
}
