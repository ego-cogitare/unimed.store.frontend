import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import { paymentForm } from '../../actions';

export default class LiqPay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      paymentForm: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    paymentForm(
      { orderId: this.props.params.id },
      ({ form: paymentForm }) => this.setState({ paymentForm }),
      (error)  => this.setState({ errorMessage: error.responseJSON.error })
    );
  }

  doPayment(e) {
    e.preventDefault();
    document.forms[0].submit();
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Оплата покупки']} title="Оплата покупки через LiqPay." />

        <div class="wrapper">
          { this.state.errorMessage &&
            <p class="text color-red">
              {this.state.errorMessage}
            </p> }
          { this.state.paymentForm &&
            <div class="text">
              Вы хотите оплатить Вашу покупку при помощи системы платежей LiqPay? <a href="#" onClick={this.doPayment.bind(this)} class="color-green">Перейти на страницу оплаты.</a>
              <div style={{display:'none'}} dangerouslySetInnerHTML={{__html: this.state.paymentForm }} />
            </div> }
          <br/>
          <br/>
          <br/>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
