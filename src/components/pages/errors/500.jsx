import React from 'react';
import { Link } from 'react-router';
import Partials from '../partials';

export default class extends React.Component {
  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={[<Link to='/'>Главная</Link>, 'Ошибка']} title="Ошибка" />
        <div class="wrapper" style={{padding:'0 0 50px 0'}}>
          Что-то пошло не так. Мы прилагаем все усилия для скорейшего решения проблемы.
        </div>
        <Partials.AdvertisingServices />
      </section>
    );
  }
}
