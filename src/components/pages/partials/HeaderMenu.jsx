import React from 'react';

export default class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div class="top-header">
          <div class="wrapper clear">
            <ul class="menu left clear">
              <li class="item left">
                <a href="#">о нас</a>
              </li>
              <li class="item left">
                <a href="#">доставка</a>
              </li>
              <li class="item left">
                <a href="#">контакты</a>
              </li>
              <li class="item left active">
                <a href="#">блог</a>
              </li>
            </ul>
            <ul class="socials right">
              <li class="item">
                <a href="#" class="fa fa-youtube-play"></a>
              </li>
              <li class="item">
                <a href="#" class="fa fa-facebook"></a>
              </li>
              <li class="item">
                <a href="#" class="fa fa-instagram"></a>
              </li>
            </ul>
            <div class="phones right">
              <i class="fa fa-phone"></i>
              <a class="phone" href="tel:0445269898">(044) 526-98-98</a>,
              <a class="phone" href="tel:0445269899">(044) 526-98-99</a>,
              <a class="phone" href="tel:0443613430">(044) 361-34-30</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
