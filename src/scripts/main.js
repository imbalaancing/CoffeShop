// slider
const slides = document.querySelectorAll(".slide");
const btnNext = document.querySelector(".customers__slider-btn__next");
const btnPrev = document.querySelector(".customers__slider-btn__prev");

let currentSlide = 0;
const slidesNumber = slides.length;

function moveToSlide(slide) {
  slides.forEach(function (item) {
    item.style.transform = `translateX(${-slide * 100}%)`;
  });
}

moveToSlide(0);

btnNext.addEventListener("click", function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
});

btnPrev.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
});
