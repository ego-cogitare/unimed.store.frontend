import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import Settings from '../../core/helpers/Settings';
import { subscribe, unsubscribe } from '../../core/helpers/EventEmitter';
import { buildUrl, currencyIcon, calcProductRealPrice } from '../../core/helpers/Utils';
import { checkout } from '../../actions';

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cart: cart.get(),
      currencyCode: currencyIcon(Settings.get('currencyCode')),
      delivery: Settings.get('delivery'),
      payment: Settings.get('payment'),
      paymentId: null,
      deliveryId: null,
    };

    this.bootstrap = this.bootstrapListener.bind(this);
    this.cartUpdate = this.cartUpdateListener.bind(this);
  }

  componentDidMount() {
    subscribe('bootstrap', this.bootstrap);
    subscribe('cart:updated', this.cartUpdate);
  }

  bootstrapListener({ settings: {delivery, payment }}) {
    this.setState({ delivery, payment });
  }

  cartUpdateListener(cart) {
    this.setState({ cart });
  }

  componentWillUnmount() {
    unsubscribe('bootstrap', this.bootstrap);
    unsubscribe('cart:updated', this.cartUpdate);
  }

  productRemove(product, e) {
    e.preventDefault();

    // Remove all such product from cart
    cart.removeProduct(product, -1);
  }

  increaseCount(product, e) {
    cart.addProduct(product);
  }

  decreaseCount(product, e) {
    // Dissallow to delete last product in a cart
    if (product.count === 1) {
      return false;
    }
    cart.removeProduct(product);
  }

  setDelivery(id) {
    this.setState({ deliveryId: id });
  }

  setPayment(id) {
    this.setState({ paymentId: id });
  }

  doCheckout() {
    const data = {
      paymentId: this.state.paymentId,
      deliveryId: this.state.deliveryId,
      order: this.state.cart.products.map(({id,count}) => ({id,count}))
    };
    checkout(
      data,
      (r) => console.log(r),
      (e) => console.error(e)
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Оформление заказа']} title="Оформление заказа" />

        {
          this.state.cart.products.length > 0 ?
            <div class="wrapper cart">
              <div class="cart-wrapper">
                <div class="cart-products">
                  <div class="heading clear">
                    <div>ФОТО</div>
                    <div>НАИМЕНОВАНИЕ ТОВАРА</div>
                    <div>АРТИКУЛ</div>
                    <div>КОЛ-ВО</div>
                    <div>ЦЕНА</div>
                    <div>ИТОГО</div>
                  </div>
                  {
                    this.state.cart.products.map((product) => (
                      <div key={product.id} class="product clear">
                        <div class="picture">
                          <Link to={`/product/${product.id}`} target="_blank">
                            <img height="75" src={buildUrl(product.picture)} alt={product.title} />
                          </Link>
                        </div>
                        <div class="description">
                          <Link to={`/product/${product.id}`} target="_blank">
                            <strong>{product.brand.title}</strong> {product.title}
                          </Link>
                        </div>
                        <div class="sku left">
                          {product.sku || '-'}
                        </div>
                        <div class="count">
                          <div class="cart-counter clear">
                            <div class="dec" onClick={this.decreaseCount.bind(this, product)}>-</div>
                            <div class="amount">{product.count}</div>
                            <div class="inc" onClick={this.increaseCount.bind(this, product)}>+</div>
                          </div>
                        </div>
                        <div class="price">
                          {this.state.currencyCode} {calcProductRealPrice(product).toFixed(2)}
                        </div>
                        <div class="total fw-600">
                          {this.state.currencyCode} {(calcProductRealPrice(product) * product.count).toFixed(2)}
                        </div>
                        <div class="product-remove right" onClick={this.productRemove.bind(this, product)}>
                          <i class="fa fa-times-circle"></i>
                        </div>
                        <div class="hr"></div>
                      </div>
                    ))
                  }
                  </div>
                  <div class="cart-summary">
                    <strong>Сумма:</strong> <span>{this.state.currencyCode} {this.state.cart.totalPrice.toFixed(2)}</span>
                  </div>
                  <div class="hr"></div>
                  {/*
                  <div class="cart-summary">
                    <strong>Промокод:</strong> <span><input type="text" class="input" value="" /></span>
                  </div>
                  <div class="hr"></div>
                  <div class="cart-summary">
                    <strong>Итого:</strong> <span>$75.00</span>
                  </div>
                  <div class="hr"></div>
                  */}
                  <div class="order-wrapper clear">
                    <div class="customer-info">
                      <div class="heading-1">покупатель</div>
                      <form class="customer-form" action="" method="post">
                        <label class="clear"><span>ФИО:</span>
                        <input type="text" class="input" value="" placeholder="Иван Иванов" />
                      </label>
                      <label class="clear"><span>E-mail:</span>
                        <input type="email" class="input" value="" placeholder="example@gmail.com" />
                      </label>
                      <label class="clear"><span>Телефон:</span>
                        <input type="text" class="input" value="" placeholder="063 523 65 65" />
                      </label>
                      <label class="clear"><span>Адрес:</span>
                        <input type="text" class="input" value="" placeholder="Одесса, ул. Раскидайловская 11" />
                      </label>
                      <label class="clear"><span>Коментарий:</span>
                      <textarea type="text" class="input textarea" value="" placeholder="прошу доставить в первой половине дня, набрать у ворот"></textarea>
                    </label>
                  </form>
                </div>
                <div class="delivery-payment-info">
                  <div class="delivery">
                    <div class="heading-1">способ доставки</div>
                    {
                      this.state.delivery.map(({id, title}) => (
                        <span key={id}>
                          <input type="radio" class="hidden" name="delivery" onClick={this.setDelivery.bind(this, id)} value="" id={`delivery-${id}`} />
                          <label for={`delivery-${id}`} class="radio-label">
                            {title}
                          </label>
                        </span>
                      ))
                    }
                  </div>
                  <div class="payment">
                    <div class="heading-1">способ оплаты</div>
                    {
                      this.state.payment.map(({id, title}) => (
                        <span key={id}>
                          <input type="radio" class="hidden" name="payment" onClick={this.setPayment.bind(this, id)} value="" id={`payment-${id}`} />
                          <label for={`payment-${id}`} class="radio-label">
                            {title}
                          </label>
                        </span>
                      ))
                    }
                  </div>
                  <div class="btn-green" onClick={this.doCheckout.bind(this)}>оформить заказ</div>
                </div>
              </div>
            </div>
          </div> :
          <div class="wrapper">В корзине нет товаров. <Link to={`/category`} className="color-green">Продолжить покупки...</Link><br/><br/><br/><br/></div>
        }

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
