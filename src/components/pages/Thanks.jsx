import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';

export default class Thanks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Завершение покупки']} title="Благодарим за Вашу покупку" />

        <div class="wrapper">
          <p class="text">
            Благодарим за Вашу покупку. Мы свяжемся с Вами в ближайшее время.
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
