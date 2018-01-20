import React from 'react';
import { Link } from 'react-router';

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
              {
                ((this.props.data.menu || []).children || []).map(({ id, link, title })=>(
                  <li key={id} class="item left">
                    <Link to={link} activeClassName="active">{title}</Link>
                  </li>
                ))
              }
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
