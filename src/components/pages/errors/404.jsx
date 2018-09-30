import React from 'react';
import { Link } from 'react-router';
import Partials from '../partials';

export default class extends React.Component {
  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={[<Link to='/'>Главная</Link>, 'Страница не найдена']} title="Страница не найдена" />
        <div class="wrapper" style={{padding:'0 0 50px 0'}}>
          Запрашиваемая Вами страница не найдена. <Link to='/' className="color-green">Вернуться на главную.</Link>
        </div>
        <Partials.AdvertisingServices />
      </section>
    );
  }
}
