// import Swiper JS
  import Swiper from 'swiper';
  // import Swiper styles
  import 'swiper/css';
  import '../styles/index.css';

  // Navigation
const sliderPrev = document.querySelector('.slider__arrow-prev');
const sliderNext = document.querySelector('.slider__arrow-next');

const slider = new Swiper('.swiper', {
  direction: 'vertical',
  spaceBetween: 30,
  centerInsufficientSlides: true,
  slidesPerView: 3,
  navigation: false,
});


slider.on('slideChange', function () {
  console.log('slide changed');
});


function handleSlidePrev() {
  slider.slidePrev();
}
function handleSlideNext() {
  slider.slideNext();

}

if (sliderPrev) {
  sliderPrev.addEventListener('click', handleSlidePrev);
  sliderPrev.addEventListener('click', checkArrow);
}

if (sliderNext) {

  sliderNext.addEventListener('click', handleSlideNext);
  sliderNext.addEventListener('click', checkArrow);
  showArrow();
}

const sliderPhotos = document.querySelectorAll(".slider__photo-img");
// const sliderPhotoDivs = document.querySelectorAll(".slider__photo");

function showArrow() {
  if ( (slider.slides.length) < 4 ) {
    sliderNext.classList.add("disabled");
  }
}

function checkArrow() {
  if (slider.isEnd) {
    sliderPrev.classList.remove("disabled");
    sliderNext.classList.add("disabled");
  }
  else if (slider.isBeginning) {
    sliderPrev.classList.add("disabled");
    sliderNext.classList.remove("disabled");
  }
}

const mainPhoto = document.getElementById("main-photo");


function changeMainImage(event) {
  mainPhoto.src = event.currentTarget.src;
  console.log(event.currentTarget);
}

sliderPhotos.forEach((photo) => {
  photo.addEventListener("click", changeMainImage);
});



export default slider;
