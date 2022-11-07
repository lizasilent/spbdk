
// import Swiper JS
  import Swiper from 'swiper';
  // import Swiper styles
  import 'swiper/css';



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

// Navigation
const sliderPrev = document.querySelector('.slider__arrow-prev');
const sliderNext = document.querySelector('.slider__arrow-next');

function handleSlidePrev() {
  slider.slidePrev();
}
function handleSlideNext() {
  slider.slideNext();
}

sliderPrev.addEventListener('click', handleSlidePrev);
sliderNext.addEventListener('click', handleSlideNext);

export default slider;
