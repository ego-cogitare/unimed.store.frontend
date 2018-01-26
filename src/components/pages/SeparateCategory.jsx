import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';

export default class SeparateCategory extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Контакты']} title="Контакты" />

        

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
