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

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
};

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", previousSlide);

// map
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    const map = L.map("map").setView(coords, 16);

    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    L.marker(coords).addTo(map).bindPopup("Your location").openPopup();
  });
}
