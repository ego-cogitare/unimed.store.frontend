import React from 'react';
import { Link } from 'react-router';
import Socials from './Socials.jsx';
import moment from 'moment';

export default class LeftMenu extends React.Component {
  render() {
    return (
      <footer>
        <div class="wrapper clear">
          <div class="copyrights left">
            <div class="logo">
              <a href="">
                <img src={require('../../../staticFiles/img/footer/footer-logo.png')} alt="UNIMED" title="UNIMED" />
              </a>
            </div>
            <div class="text-small">
              <p>©2016-{moment().format('YYYY')} Junimed - ведущий импортер.</p>
              <p>Все права защищены.</p>
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
                <img src={require('../../../staticFiles/img/footer/cards/paypal.jpg')} alt="PayPal" title="PayPal" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/ebay.jpg')} alt="ebay" title="ebay" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/cirius.jpg')} alt="Cirius" title="Cirius" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/mastercard.jpg')} alt="MasterCard" title="MasterCard" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/visa.jpg')} alt="Visa" title="Visa" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/discover.jpg')} alt="Discover" title="Discover" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/google.jpg')} alt="Google" title="Google" />
              </li>
              <li>
                <img src={require('../../../staticFiles/img/footer/cards/maestro.jpg')} alt="Maestro" title="Maestro" />
              </li>
            </ul>
          </div>
          <div itemScope itemType="http://schema.org/Organization" class="contacts right">
            <p class="heading-3">
              <span class="heading-4 fw-500">тел:</span> <a class="fw-100" href="tel:+380445269898"><span itemProp="email">+38 (044)526-98-98</span></a>
            </p>
            <p class="heading-3">
              <a class="fw-100" href="tel:+380445269899"><span itemProp="telephone">+38 (044)526-98-99</span></a>
            </p>
            <p class="heading-3">
              <a class="fw-100" href="tel:+380445269900"><span itemProp="telephone">+38 (044)526-99-00</span></a>
            </p>
            <p class="heading-3 email">
              <span class="heading-4 fw-500">e-mail:</span> <a class="fw-100" href="mailto:n.suzdaltseva@junimed.ua"><span itemProp="email">n.suzdaltseva@junimed.ua</span></a>
            </p>
            <Socials />
          </div>
        </div>
      </footer>
    );
  }
}
