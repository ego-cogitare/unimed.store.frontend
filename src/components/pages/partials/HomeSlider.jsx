import React from 'react';
import { Link } from 'react-router';
import { buildUrl } from '../../../core/helpers/Utils';

export default class HomeSlider extends React.Component {

  componentDidMount() {
    new Swiper($(this.refs.slider), {
      direction: 'horizontal',
      slidesPerView: 1,
      nextButton: $(this.refs.slider).find('.btn-next'),
      prevButton: $(this.refs.slider).find('.btn-prev'),
      paginationClickable: true,
      autoplay: 5000,
      loop: true,
      spaceBetween: 0,
      mousewheelControl: false,
      speed: 1000
    });
  }

  render() {
    return (
      <div id="home-slider-01" ref="slider" class="swiper-container">
         <ul class="swiper-wrapper">
            <li class="swiper-slide" style={{backgroundImage: `url("${require('../../../staticFiles/img/home/slider/slide-01.jpg')}")`}}>
              <div class="btn">
                <a href="#">новая коллекция</a>
              </div>
            </li>
            <li class="swiper-slide" style={{backgroundImage: `url("${require('../../../staticFiles/img/home/slider/slide-01.jpg')}")`}}>
              <div class="btn">
                <a href="#">новая коллекция</a>
              </div>
            </li>
            <li class="swiper-slide" style={{backgroundImage: `url("${require('../../../staticFiles/img/home/slider/slide-01.jpg')}")`}}>
              <div class="btn">
                <a href="#">новая коллекция</a>
              </div>
            </li>
         </ul>
         <div class="slider-arrow btn-prev">
           <img src={require('../../../staticFiles/img/home/slider/left-arrow.png')} alt="Previous" />
         </div>
         <div class="slider-arrow btn-next">
           <img src={require('../../../staticFiles/img/home/slider/right-arrow.png')} alt="Next" />
         </div>
      </div>
    );
  }
}
