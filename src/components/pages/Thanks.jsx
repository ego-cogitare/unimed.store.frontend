import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';

export default class Thanks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={[<Link to='/'>Главная</Link>, 'Завершение покупки']} title="Благодарим за Ваш заказ." />

        <div class="wrapper">
          <p class="text">
            Благодарим за Ваш заказ. Мы свяжемся с Вами в ближайшее время.
          </p>
          <br/>
          <br/>
          <br/>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
