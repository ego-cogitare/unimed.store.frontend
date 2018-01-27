import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Оформление заказа']} title="Оформление заказа" />

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
              <div class="product clear">
                <div class="picture">
                  <a href="#">
                    <img src="img/cart/product-01.jpg" alt="" />
                  </a>
                </div>
                <div class="description">
                  <a href="#">
                    <strong>BioSolis</strong> SPF 50+
                  </a>
                </div>
                <div class="sku left">
                  72602
                </div>
                <div class="count">
                  <div class="cart-counter clear">
                    <div class="dec">-</div>
                    <div class="amount">1</div>
                    <div class="inc">+</div>
                  </div>
                </div>
                <div class="price">
                  $ 75.00
                </div>
                <div class="total fw-600">
                  $ 75.00
                </div>
                <div class="product-remove right">
                  <i class="fa fa-times-circle"></i>
                </div>
              </div>

              <div class="hr"></div>

              <div class="product clear">
                <div class="picture">
                  <a href="#">
                    <img src="img/cart/product-01.jpg" alt="" />
                  </a>
                </div>
                <div class="description">
                  <a href="#">
                    <strong>BioSolis</strong> SPF 50+
                  </a>
                </div>
                <div class="sku left">
                  72602
                </div>
                <div class="count">
                  <div class="cart-counter clear">
                    <div class="dec">-</div>
                    <div class="amount">1</div>
                    <div class="inc">+</div>
                  </div>
                </div>
                <div class="price">
                  $ 75.00
                </div>
                <div class="total fw-600">
                  $ 75.00
                </div>
                <div class="product-remove right">
                  <i class="fa fa-times-circle"></i>
                </div>
              </div>
            </div>
            <div class="hr"></div>
            <div class="cart-summary">
              <strong>Сумма:</strong> <span>$75.00</span>
            </div>
            <div class="hr"></div>
            <div class="cart-summary">
              <strong>Промокод:</strong> <span><input type="text" class="input" value="" /></span>
            </div>
            <div class="hr"></div>
            <div class="cart-summary">
              <strong>Итого:</strong> <span>$75.00</span>
            </div>
            <div class="hr"></div>

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
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
