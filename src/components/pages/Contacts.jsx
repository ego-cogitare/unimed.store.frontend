import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';

export default class Contacts extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Контакты']} title="Контакты" />

        <div class="wrapper blog contacts clear">
          <div class="content clear">
            <div class="map-wrapper">
              <div class="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.5746613209785!2d30.745703615824926!3d46.47693237331671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6319df8ae932d%3A0x364f4d9b31dd14f6!2z0LLRg9C70LjRhtGPINCa0LDQvdCw0YLQvdCwLCAzMywg0J7QtNC10YHQsCwg0J7QtNC10YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDY1MDAw!5e0!3m2!1sru!2sua!4v1515445034199" width="435" height="378" frameBorder="0" style={{ border: 0 }} allowFullScreen=""></iframe>
                <div class="map-label">главный офис</div>
              </div>
            </div>
            <div class="address">
              <div class="heading-1">
                Главный офис,<br/> шоу рум
              </div>
              <p class="text ico-location">
                <strong>ул. Канатная 53</strong>
              </p>
              <p class="text">
                Директор - Стрелец Иннокентий
              </p>
              <p class="text ico-phone">
                тел/факс <a href="tel:+38 (048) 705 43 48">+38 (048) 705 43 48</a>
              </p>
              <p class="text">
                моб. <a href="tel:+38 (063) 523 65 65">+38 (063) 523 65 65</a>
              </p>
              <p class="text ico-mail">
                <a href="mailto:junimed-odessa@ukr.net">junimed-odessa@ukr.net</a>
              </p>
              <p class="text ico-skype">
                Skype: <a href="skype:junimed2">junimed2</a>
              </p>
            </div>
            <div class="address">
              <div class="heading-1">
                <br/>склад
              </div>
              <p class="text ico-location">
                <strong>ул. Картамышевская, 9-б</strong>
              </p>
              <p class="text">
                Алексей Бабенко
              </p>
              <p class="text ico-phone">
                моб. <a href="tel:+38 (063) 523 65 65">+38 (063) 523 65 65</a>
              </p>
            </div>
          </div>
          <div class="sitebar">
            <div class="heading-1">
              <br/>мы в соцсетях
            </div>
            <ul class="widgets">
              <li class="widget">
                <i class="fa fa-facebook"></i>
                <a href="#">
                  <img src={require('../../staticFiles/img/sitebar/widget-facebook.jpg')} alt="Facebook" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
