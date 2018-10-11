import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import SocialWidgets from '../widgets';

export default class Contacts extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const bounds = new google.maps.LatLngBounds();
    const map = new google.maps.Map(this.refs['map-canvas'], { mapTypeId: 'roadmap' });
    const markers = [
        ['вулиця Авіаконструктора Антонова, 8, Чайки, Київська обл., 08130', 50.4359932, 30.306797],
        ['вулиця Васильківська, 14, Київ, 02000', 50.3961549, 30.5015943]
    ];
    const infoWindow = new google.maps.InfoWindow();

    markers.forEach(function(marker) {
      const position = new google.maps.LatLng(marker[1], marker[2]);
      bounds.extend(position);
      new google.maps.Marker({
          position: position,
          map: map,
          title: marker[0]
      });
      map.fitBounds(bounds);
    });

    // Fit bounds on window resize
    $(window).bind('resize', function() {
      map.fitBounds(bounds);
    });
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={[<Link to='/'>Главная</Link>, 'Контакты']} title="Контакты" />

        <div itemScope itemType="http://schema.org/Organization" class="wrapper blog contacts clear">
          <div class="content clear">
            <div class="map-wrapper">
              <div class="map" id="map">
                <div ref="map-canvas" class="map-canvas"></div>
                <div class="map-label">главный офис</div>
              </div>
            </div>
            <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress" class="address">
              <h1 class="heading-1">
                <span itemProp="name">Главный офис,<br/> шоу рум</span>
              </h1>
              <p class="text ico-location">
                <strong itemProp="streetAddress">ул. Канатная 53</strong>
              </p>
              <p class="text">
                Директор - Стрелец Иннокентий
              </p>
              <p class="text ico-phone">
                тел/факс <a href="tel:+38 (048) 705 43 48"><span itemProp="telephone">+38 (048) 705 43 48</span></a>
              </p>
              <p class="text">
                моб. <a href="tel:+38 (063) 523 65 65"><span itemProp="telephone">+38 (063) 523 65 65</span></a>
              </p>
              <p class="text ico-mail">
                <a href="mailto:junimed-odessa@ukr.net"><span itemProp="email">junimed-odessa@ukr.net</span></a>
              </p>
              <p class="text ico-skype">
                Skype: <a href="skype:junimed2">junimed2</a>
              </p>
            </div>
            <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress" class="address">
              <h1 class="heading-1">
                <br/><span itemProp="name">склад</span>
              </h1>
              <p class="text ico-location">
                <strong itemProp="streetAddress">ул. Картамышевская, 9-б</strong>
              </p>
              <p class="text">
                Алексей Бабенко
              </p>
              <p class="text ico-phone">
                моб. <a href="tel:+38 (063) 523 65 65"><span itemProp="telephone">+38 (063) 523 65 65</span></a>
              </p>
            </div>
          </div>
          <div class="sitebar">
            <h1 class="heading-1">
              <br/>мы в соцсетях
            </h1>
            <ul class="widgets">
              <li class="widget">
                <i class="fa fa-facebook"></i>
                <SocialWidgets.Facebook />
              </li>
            </ul>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
