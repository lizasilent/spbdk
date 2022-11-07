// import Swiper bundle with all modules installed
  import Swiper from 'swiper/bundle';

  // import styles bundle
  import 'swiper/css/bundle';

  const swiper = new Swiper('.slider', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,


    // Navigation arrows
    navigation: {
      nextEl: '.slider__arrow-prev',
      prevEl: '.slider__arrow-next',
    },

  });

  export {swiper};
