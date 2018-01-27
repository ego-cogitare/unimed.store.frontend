import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import Settings from '../../core/helpers/Settings';
import { subscribe } from '../../core/helpers/EventEmitter';
import { buildUrl, currencyIcon, calcProductRealPrice } from '../../core/helpers/Utils';

export default class Cart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cart: cart.get(),
      currencyCode: currencyIcon(Settings.get('currencyCode')),
    };
  }

  componentDidMount() {
    // Broadcast cart updated event
    subscribe('cart:updated', (cart) => {
      this.setState({ cart });
    });
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
                    <input type="radio" class="hidden" name="delivery" value="" id="delivery-1" />
                    <label for="delivery-1" class="radio-label">
                      Курьерская доставка по Украине
                    </label>
                    <input type="radio" class="hidden" name="delivery" value="" id="delivery-2" />
                    <label for="delivery-2" class="radio-label">
                      Самовывоз со склада в Одессе
                    </label>
                  </div>
                  <div class="payment">
                    <div class="heading-1">способ оплаты</div>
                    <input type="radio" class="hidden" name="payment" value="" id="payment-1" />
                    <label for="payment-1" class="radio-label">
                      Наличными курьеру
                    </label>
                    <input type="radio" class="hidden" name="payment" value="" id="payment-2" />
                    <label for="payment-2" class="radio-label">
                      Предоплата на карту
                    </label>
                    <input type="radio" class="hidden" name="payment" value="" id="payment-3" />
                    <label for="payment-3" class="radio-label">
                      При получении на почте (наложенный платеж)
                    </label>
                  </div>
                  <div class="btn-green">оформить заказ</div>
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
