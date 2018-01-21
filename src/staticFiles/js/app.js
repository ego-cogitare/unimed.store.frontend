$(document).ready(function() {

  $('.search-cart .fa-search').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('expanded');
  });

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

  var $thumbnailsSlider = $('#product-thumbnails')
    , productSlider = new Swiper($thumbnailsSlider, {
        direction: 'vertical',
        slidesPerView: 4,
        nextButton: '#product-thumbnails ~ .button-next',
        prevButton: '#product-thumbnails ~ .button-prev',
        paginationClickable: true,
        // autoplay: 3000,
        // loop: true,
        spaceBetween: 5,
        mousewheelControl: true,
        speed: 300,
        onClick: function(swiper) {
          $thumbnailsSlider.find('.swiper-slide').removeClass('swiper-slide-active');
          $thumbnailsSlider.find('.swiper-slide:eq(' + swiper.clickedIndex + ')').addClass('swiper-slide-active');
        },
      });

  if ($('#brands-slider').length !== 0)
  {
    var brandSlider = new Swiper('#brands-slider', {
      direction: 'horizontal',
      slidesPerView: 6,
      nextButton: $('#brands-slider').find('.btn-next'),
      prevButton: $('#brands-slider').find('.btn-prev'),
      paginationClickable: true,
      loop: false,
      spaceBetween: 4,
      mousewheelControl: false,
      speed: 1000,
      autoResize: false,
      resizeReInit: true,
      onSlideChangeStart: function(swiper) {
        $('#brands-slider').find('.slider-arrow').removeClass('hide');
        if (swiper.isBeginning) {
          $('#brands-slider').find('.btn-prev').addClass('hide');
        }
        if (swiper.isEnd) {
          $('#brands-slider').find('.btn-next').addClass('hide');
        }
      }
    });

    $(window).bind('resize', function() {
      var width = $('body').width();

      if (width >= 1680)                      brandSlider.params.slidesPerView = 6;
      else if (width >= 1367 && width < 1680) brandSlider.params.slidesPerView = 5;
      else if (width > 1024 && width < 1367)  brandSlider.params.slidesPerView = 4;
      else if (width >= 768 && width <= 1024) brandSlider.params.slidesPerView = 3;
      else                                    brandSlider.params.slidesPerView = 1;
      brandSlider.update();
    });
    $(window).trigger('resize');
  }
});
