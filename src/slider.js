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

sliderPrev.addEventListener('click', handleSlidePrev);
sliderNext.addEventListener('click', handleSlideNext);
sliderNext.addEventListener('click', checkArrow);
sliderPrev.addEventListener('click', checkArrow);

function showArrow() {
  if ( (slider.slides.length) < 4 ) {
sliderNext.classList.add("disabled");
}
}

showArrow();


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




export default slider;
