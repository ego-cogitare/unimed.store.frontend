import React from 'react';

export default class AdvertisingServices extends React.Component {
  render() {
    return (
      <div class="wrapper">
        <div class="advertising-services">
          <div class="service">
            <div class="service-wrapper clear">
              <div class="icon left">
                <img src={require('../../../staticFiles/img/services/service-01.png')} alt="" title="" />
              </div>
              <div class="left">
                <div class="title">Бесплатная доставка</div>
                <div class="description">Проснувшись однажы утром<br/> после беспокойного сна.</div>
              </div>
            </div>
          </div>
          <div class="service">
            <div class="service-wrapper clear">
              <div class="icon left">
                <img src={require('../../../staticFiles/img/services/service-02.png')} alt="" title="" />
              </div>
              <div class="left">
                <div class="title">Наложеный платеж</div>
                <div class="description">Проснувшись однажы утром<br/> после беспокойного сна.</div>
              </div>
            </div>
          </div>
          <div class="service">
            <div class="service-wrapper clear">
              <div class="icon left">
                <img src={require('../../../staticFiles/img/services/service-03.png')} alt="" title="" />
              </div>
              <div class="left">
                <div class="title">Гарантия качества</div>
                <div class="description">Проснувшись однажы утром<br/> после беспокойного сна.</div>
              </div>
            </div>
          </div>
          <div class="service">
            <div class="service-wrapper clear">
              <div class="icon left">
                <img src={require('../../../staticFiles/img/services/service-04.png')} alt="" title="" />
              </div>
              <div class="left">
                <div class="title">Скидки клиентам</div>
                <div class="description">Проснувшись однажы утром<br/> после беспокойного сна.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
