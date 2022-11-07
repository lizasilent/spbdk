  // import Swiper bundle with all modules installed
  import Swiper from 'swiper/bundle';

  // import styles bundle
  import 'swiper/css/bundle';

  const swiper = new Swiper('.photo-block__slider', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
      nextEl: '.slider__arrow-prev',
      prevEl: '.slider__arrow-next',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
