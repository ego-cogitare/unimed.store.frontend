new Swiper('#home-slider-01', {
  direction: 'horizontal',
  slidesPerView: 1,
  nextButton: $(this).find('.btn-next'),
  prevButton: $(this).find('.btn-prev'),
  paginationClickable: true,
  autoplay: 5000,
  loop: true,
  spaceBetween: 0,
  mousewheelControl: false,
  speed: 1000
});
