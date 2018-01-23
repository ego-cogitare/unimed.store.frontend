import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import classNames from 'classnames';
import Partials from './partials';
import { buildUrl, currencyIcon } from '../../core/helpers/Utils';
import Settings from '../../core/helpers/Settings';
import { product } from '../../actions';

export default class Product extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      product: {
        price: 0,
        brand: {},
        picture: {},
        category: {},
        relatedProducts: [],
        pictures: [],
      },
      currencyCode: currencyIcon(Settings.get('currencyCode'))
    };
  }

  initSlider() {
    const $thumbnailsSlider = $('#product-thumbnails')
        , productSlider = new Swiper($thumbnailsSlider, {
            direction: 'vertical',
            slidesPerView: 4,
            nextButton: '#product-thumbnails ~ .button-next',
            prevButton: '#product-thumbnails ~ .button-prev',
            paginationClickable: false,
            spaceBetween: 5,
            mousewheelControl: true,
            speed: 300,
            // onClick: function(swiper) {
            //   $thumbnailsSlider.find('.swiper-slide').removeClass('swiper-slide-active');
            //   $thumbnailsSlider.find('.swiper-slide:eq(' + swiper.clickedIndex + ')').addClass('swiper-slide-active');
            // },
          });
  }

  fetchProduct(props, callback) {
    product(
      { id: props.params.id },
      (product) => this.setState({ product }, this.initSlider),
      (error)  => console.error(error)
    );
  }

  componentDidMount() {
    this.fetchProduct(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchProduct(props);
  }

  calcDiscountPrice() {
    let price = this.state.product.price;

    if (this.state.product.discountType === 'const') {
      price = this.state.product.price - this.state.product.discount;
    }
    if (this.state.product.discountType === '%') {
      price = this.state.product.price * (1 - 0.01 * this.state.product.discount);
    }
    return price.toFixed(2);
  }

  setProductPicture(picture) {
    this.state.product.picture = picture;
    this.setState({ product: this.state.product });
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Каталог', this.state.product.title]} title={this.state.product.title} />

        <div class="wrapper product-page">
          <div class="product-view clear">
            <div class="column left">
              <div class="clear product-picture">
                <div class="product-thumbnails left">
                  <div id="product-thumbnails" class="swiper-container">
                    <ul class="swiper-wrapper">
                      {
                        this.state.product.pictures.map((picture) => (
                          <li key={picture.id} class={classNames('swiper-slide', {'active': this.state.product.picture.id === picture.id})} onClick={this.setProductPicture.bind(this, picture)} style={{backgroundImage: `url("${buildUrl(picture)}")`}}></li>
                        ))
                      }
                    </ul>
                  </div>
                  <div class="navigate button-prev fa fa-angle-up"></div>
                  <div class="navigate button-next fa fa-angle-down"></div>
                </div>
                <div class="left">
                  <div class="product-photo">
                    <img src={buildUrl(this.state.product.picture)} alt={this.state.product.title} />
                  </div>
                </div>
              </div>
              <div class="history">
                <Partials.BlockTitle title="вы уже смотрели" className="text-left no-margin" />
                <div class="products-list">
                  <div class="product new no-hover-border no-hover-btn">
                    <div class="product-wrapper">
                      <div class="picture">
                        <a href="#">
                          <img src="img/products/product-01.jpg" alt="луковые хлебцы" />
                        </a>
                      </div>
                      <div class="icon"></div>
                      <div class="title"><span class="brand">Le Pain des fleurts</span> луковые хлебцы</div>
                      <div class="price">$ 75.00</div>
                      <div class="btn-green btn-buy">
                        <a href="#">Купить</a>
                      </div>
                    </div>
                  </div>
                  <div class="product new no-hover-border no-hover-btn">
                    <div class="product-wrapper">
                      <div class="picture">
                        <a href="#">
                          <img src="img/products/product-01.jpg" alt="луковые хлебцы" />
                        </a>
                      </div>
                      <div class="icon"></div>
                      <div class="title"><span class="brand">Le Pain des fleurts</span> луковые хлебцы</div>
                      <div class="price">$ 75.00</div>
                      <div class="btn-green btn-buy">
                        <a href="#">Купить</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column left clear">
              <div class="general-info left">
                <div class="hr"></div>
                <div class="sku-brand">
                  <span>Артикул: 102605</span><i class="divider"></i><span>Бренд: {this.state.product.brand.title}</span>
                </div>
                <div class="hr"></div>
                <div class="clear">
                  {
                    this.state.product.discountType ?
                      <div class="price left">
                        <span>{this.state.currencyCode} {this.calcDiscountPrice()}</span>
                        <span class="old">{this.state.currencyCode} {this.state.product.price.toFixed(2)}</span>
                      </div> :
                      <div class="price left">
                        <span>{this.state.currencyCode} {this.state.product.price.toFixed(2)}</span>
                      </div>
                  }
                  <div class="counter left">
                    <span>через</span>
                    <div class="timer clear" id="timer">
                      <div class="digit hrs left">
                        <span>1</span><span>9</span>
                      </div>
                      <span class="left">:</span>
                      <div class="digit min left">
                        <span>0</span><span>2</span>
                      </div>
                      <span class="left">:</span>
                      <div class="digit sec left">
                        <span>3</span><span>6</span>
                      </div>
                    </div>
                    <span>цена на товар <br/> изменится</span>
                  </div>
                </div>
                <div class="clear buy-btns">
                  <div class="btn btn-green left">добавить в корзину</div>
                  <div class="btn left">купить в один клик</div>
                </div>
                <div class="hr"></div>
                <div class="tabs-wrapper">
                  <ul class="tabs clear">
                    <li class="left active">
                      <a href="#tab-description">описание продукта</a>
                    </li>
                    <li class="left">
                      <a href="#tab-votes">отзывы</a>
                    </li>
                  </ul>
                  <div class="tabs-content">
                    <div id="tab-description" class="tab-content visible">
                      <div class="properties">
                        <p><span class="fw-600">Материал:</span> Эко пластик</p>
                        <p><span class="fw-600">Еще инфо:</span> Medela</p>
                        <p><span class="fw-600">Производитель:</span> Китай</p>
                      </div>
                      <p class="text">
                        Этот электрический нагрудный насос позволит вам выражать молоко спокойно и незаметно,
                        поэтому он идеально подходит для занятого образа жизни. Поскольку он компактный и легкий,
                        он отлично подходит для ежедневной электрической накачки.
                      </p>
                      <p class="text">
                        <br/>
                        Технология 2-фазной экспрессии откачивает больше молока за меньшее время. Он имитирует
                        естественное сосание ребенка с первоначальным быстрым ритмом накачки, чтобы начать
                        протекание молока, а затем медленный ритм накачки, чтобы мягко и эфеективно выражать молоко.
                      </p>
                      <div class="btn btn-youtube">
                        <a href="#"><i class="fa fa-youtube-play"></i> обзор на youtube</a>
                      </div>
                    </div>
                    <div id="tab-votes" class="tab-content">votes</div>
                  </div>
                </div>
              </div>
              <div class="awards left">
                <div class="award">
                  <img src="img/products/awards/award-2015.png" alt="Award 2015" />
                </div>
                <div class="award">
                  <img src="img/products/awards/award-2016.png" alt="Award 2016" />
                </div>
                <div class="award">
                  <img src="img/products/awards/award-2015.png" alt="Award 2015" />
                </div>
              </div>
            </div>
          </div>

          {/* Related products */
            this.state.product.relatedProducts.length > 0 &&
            <div class="wrapper">
              <Partials.BlockTitle title="вам может понравиться" />
            </div>
          }{
            this.state.product.relatedProducts.length > 0 &&
            <div class="wrapper">
              <Partials.ProductsList products={this.state.product.relatedProducts} />
            </div>
          }

          <div class="text-block text-center">
            <div class="heading-3 fw-600">
              Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца.
            </div>
            <p class="text">
              Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"
            </p>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
