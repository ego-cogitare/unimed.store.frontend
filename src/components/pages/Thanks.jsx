import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import { paymentForm } from '../../actions';

export default class Thanks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      paymentForm: ''
    };
  }

  componentDidMount() {
    paymentForm(
      { orderId: '1' },
      ({ form: paymentForm }) => this.setState({ paymentForm }),
      (error)  => console.error(error)
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Завершение покупки']} title="Благодарим за Вашу покупку" />

        <div class="wrapper">
          <p class="text">
            Благодарим за Ваш заказ. Мы свяжемся с Вами в ближайшее время.
          </p>
          <br/>
          <br/>
          <br/>
          {
            this.state.paymentForm &&
            <div dangerouslySetInnerHTML={{__html: this.state.paymentForm }} />
          }
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
