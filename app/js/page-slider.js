new Glide("#glide1", {
  type: "carousel",
  perView: 3,
  breakpoints: {
    800: {
      perView: 1,
    },
  },
}).mount();
