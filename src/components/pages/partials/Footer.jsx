import React from 'react';
import { Link } from 'react-router';
import Socials from './Socials.jsx';

export default class LeftMenu extends React.Component {
  render() {
    return (
      <footer>
        <div class="wrapper clear">
          <div class="copyrights left">
            <div class="logo">
              <a href="">
                <img src={require('../../../staticFiles/img/footer/footer-logo.png')} alt="UNIMED" />
              </a>
            </div>
            <div class="text-small">
              <p>©2016-2017 Junimed - ведущий импортер.</p>
              <p>Все права защищены.</p>
              <p><a href="#" class="color-green">Политика конфиденциальности</a></p>
            </div>
          </div>
          <div class="links left">
            <ul class="columns fw-500 heading-3">
              {
                ((this.props.data.menu || []).children || []).map(({ id, link, title })=>(
                  <li key={id}>
                    <Link to={link} activeClassName="active">/{title}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div class="pay-cards left">
            <p class="heading-4 fw-500">
              принимаем к оплате:
            </p>
            <ul class="cards-list">
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/paypal.jpg')} alt="PayPal" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/ebay.jpg')} alt="ebay" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/cirius.jpg')} alt="Cirius" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/mastercard.jpg')} alt="MasterCard" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/visa.jpg')} alt="Visa" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/discover.jpg')} alt="Discover" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/google.jpg')} alt="Google" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/maestro.jpg')} alt="Maestro" />
              </li>
            </ul>
          </div>
          <div class="contacts right">
            <p class="heading-3">
              <span class="heading-4 fw-500">тел:</span> <a class="fw-100" href="tel:+380445269898">+38 (044)526-98-98</a>
            </p>
            <p class="heading-3">
              <a class="fw-100" href="tel:+380445269899">+38 (044)526-98-99</a>
            </p>
            <p class="heading-3">
              <a class="fw-100" href="tel:+380445269900">+38 (044)526-99-00</a>
            </p>
            <p class="heading-3 email">
              <span class="heading-4 fw-500">e-mail:</span> <a class="fw-100" href="mailto:n.suzdaltseva@junimed.ua">n.suzdaltseva@junimed.ua</a>
            </p>
            <Socials />
          </div>
        </div>
      </footer>
    );
  }
}
