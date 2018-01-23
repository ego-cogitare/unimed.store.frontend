import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import classNames from 'classnames';
import Partials from './partials';
import { buildUrl, currencyIcon, viewHistoryPush, viewHistoryList } from '../../core/helpers/Utils';
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
      currencyCode: currencyIcon(Settings.get('currencyCode')),
      historyList: []
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
            speed: 300
          });
  }

  fetchProduct(props) {
    product(
      { id: props.params.id },
      (product) => this.setState({
        product,
        historyList: viewHistoryList().filter(({id}) => id !== this.props.params.id)
      },
      () => {
        // Initialize product slider
        this.initSlider();
        // Add product to view history
        viewHistoryPush(product);
      }),
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
              {
                this.state.historyList.length > 0 &&
                <div class="history">
                  <Partials.BlockTitle title="вы уже смотрели" className="text-left no-margin" />
                  <Partials.ProductsList products={this.state.historyList.slice(0, 2)} />
                </div>
              }
            </div>
            <div class="column left clear">
              <div class="general-info left">
                <div class="hr"></div>
                <div class="sku-brand">
                  <span>Артикул: {this.state.product.sku}</span><i class="divider"></i><span>Бренд: {this.state.product.brand.title}</span>
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
                        { this.state.product.briefly }
                      </p>
                      {/*
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
                      </p>*/}
                      {
                        this.state.product.video &&
                        <div class="btn btn-youtube">
                          <a href={this.state.product.video} target="_blank"><i class="fa fa-youtube-play"></i> обзор на youtube</a>
                        </div>
                      }
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
          <div
            class="text-block text-center"
            dangerouslySetInnerHTML={{ __html: this.state.product.description }}
          />
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
