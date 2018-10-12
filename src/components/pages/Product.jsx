import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';
import classNames from 'classnames';
import { dispatch } from '../../core/helpers/EventEmitter';
import Partials from './partials';
import { buildUrl, currencyIcon, viewHistoryPush, viewHistoryList, calcProductRealPrice } from '../../core/helpers/Utils';
import Settings from '../../core/helpers/Settings';
import { product, addProductReview, buyInClick } from '../../actions';

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
        awards: [],
        properties: [],
      },
      currencyCode: currencyIcon(Settings.get('currencyCode')),
      historyList: [],
      productTab: 'description',
      cartAddProgress: false,
      discountTimeout: {
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
      discountTimeLeft: 0,
      reviewRate: 0,
      reviewUserName: '',
      reviewComment: '',
      reviewError: '',
      reviewSuccess: '',

      buyInClick: {
        userName: '',
        userPhone: '',
        userNameError: '',
        userPhoneError: '',
        messageSuccess: ''
      }
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
        // product: Object.assign(product, { discountTimeout: '' }),
        historyList: viewHistoryList().filter(({ slug }) => slug !== this.props.params.id)
      },
      () => {
        // Initialize product slider
        this.initSlider();

        // Add product to view history
        viewHistoryPush(product);

        // Initialize discount ticker/check timer
        this.initDiscountTimer(product.discountTimeout);

        // Adaptive adjustments
        this.adjustMarkup();
      }),
      (error)  => console.error(error)
    );
  }

  adjustMarkup() {
    $(window).bind('resize', () => {
      var width = $('body').width();

      if (width < 768) {
        $(this.refs.awards).appendTo($(this.refs['product-picture']));
      }
      if (width >= 768 && width < 1024) {
        $(this.refs.awards).insertBefore($(this.refs['general-info']));
      }
    })
    .trigger('resize');
  }

  initDiscountTimer(timeout) {
    // If timeout discount not set
    if (!timeout) {
      return ;
    }
    if (timeout && timeout - 0.001 * Date.now() > 0) {
      setInterval(() => {
        // Time left to discount period is over
        const timeLeft = timeout - Math.ceil(0.001 * Date.now());

        // Calculate hours/minutes/seconds to period end
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft - hours * 3600) / 60);
        const seconds = timeLeft % 60;

        this.setState({
            discountTimeout: {
              hours: String(hours),
              minutes: ('0' + minutes).slice(-2),
              seconds: ('0' + seconds).slice(-2)
            },
            discountTimeLeft: timeLeft
          },
          () => {
            // Check if discount time is over
            if (timeLeft <= 0) {
              this.setState({
                product: Object.assign(this.state.product, { discountType: '' })
              });
            }
          }
        );
      },
      1000);
    }
    // Discount time is over
    else
    {
      this.setState({
        product: Object.assign(this.state.product, { discountType: '' })
      });
    }
  }

  componentDidMount() {
    this.fetchProduct(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchProduct(props);
  }

  setProductPicture(picture) {
    this.state.product.picture = picture;
    this.setState({ product: this.state.product });
  }

  setProductTab(productTab, e) {
    e.preventDefault();
    this.setState({ productTab });
  }

  addReview() {
    this.setState({
      reviewError: '',
      reviewSuccess: '',
    });

    const review = {
      productId: this.props.params.id,
      rate: 6 - this.state.reviewRate,
      userName: this.state.reviewUserName,
      review: this.state.reviewComment,
    };

    addProductReview(
      review,
      ({message}) => {
        this.setState({
          reviewSuccess: message,
          reviewRate: 0,
          reviewUserName: '',
          reviewComment: ''
        });
      },
      (response)  => this.setState({ reviewError: response.responseJSON.error })
    );
  }

  addToCart(product) {
    if (this.state.cartAddProgress) {
      return false;
    }
    const cartProduct = {
      brand: product.brand,
      picture: product.picture,
      title: product.title,
      id: product.id,
      price: product.price,
      sku: product.sku,
      discount: product.discount,
      discountType: product.discountType,
      cartAddProgress: true
    };
    dispatch('cart:product:add', cartProduct);

    // Freeze product add on 1 sec
    this.setState({ cartAddProgress: true })
    setTimeout(() => this.setState({ cartAddProgress: false }), 1500);
  }

  doBuyInClick(e) {
    e.preventDefault();

    Object.assign(
      this.state.buyInClick,
      { userNameError: '',
        userPhoneError: '',
        messageSuccess: '' }
    );
    this.setState({ buyInClick: this.state.buyInClick });

    // Send buy in one click request
    buyInClick(
      { userName: this.state.buyInClick.userName,
        userPhone: this.state.buyInClick.userPhone },
      ({message}) => {
        this.state.buyInClick.messageSuccess = message;
        this.setState({ buyInClick: this.state.buyInClick });
      },
      (e) => {
        this.state.buyInClick[`${e.responseJSON.field}Error`] = e.responseJSON.error;
        this.setState({ buyInClick: this.state.buyInClick });
      }
    );
  }

  popupBuyInClickOpen(e) {
    e.preventDefault();
    Object.assign(
      this.state.buyInClick,
      { userName: '',
        userPhone: '',
        userNameError: '',
        userPhoneError: '',
        messageSuccess: '' }
    );
    this.setState({ buyInClick: this.state.buyInClick });
    $('html, body').addClass('no-scroll');
    $(this.refs['popup-buy-in-click']).addClass('opened');
  }

  render() {
    return (
      <section>
        <Partials.PageTitle
          breadcumbs={[<Link to='/'>Главная</Link>, this.state.product.title]}
          title={this.state.product.title}
        />
        <div class="wrapper product-page">
          <div class="product-view clear">
            <div class="column left">
              <div ref="product-picture" class="clear product-picture">
                <div class="product-thumbnails left">
                  <div id="product-thumbnails" class="swiper-container">
                    <ul class="swiper-wrapper">
                    {
                      this.state.product.pictures.map((picture) => (
                        <li key={picture.id}
                            class={classNames('swiper-slide', {'active': this.state.product.picture.id === picture.id})}
                            onClick={this.setProductPicture.bind(this, picture)}
                            style={{backgroundImage: `url("${buildUrl(picture)}")`}}
                        ></li>
                      ))
                    }
                    </ul>
                  </div>
                  <div class="navigate button-prev fa fa-angle-up"></div>
                  <div class="navigate button-next fa fa-angle-down"></div>
                </div>
                <div class="left">
                  <div class="product-photo">
                    <img src={buildUrl(this.state.product.picture)} alt={this.state.product.title} title={this.state.product.title} />
                  </div>
                </div>
              </div>
              {
                this.state.historyList.length > 0 &&
                <div class="history">
                  <Partials.BlockTitle title="вы уже смотрели" className="text-left no-margin" />
                  <Partials.ProductsList products={this.state.historyList.slice(0, 2)} className="no-hover-border no-hover-btn" />
                </div>
              }
            </div>
            <div class="column left clear">
              <div ref="general-info" class="general-info left">
                <div class="hr"></div>
                <div class="sku-brand">
                  <span>Артикул: {this.state.product.sku}</span><i class="divider"></i><span>Бренд: {this.state.product.brand.title}</span>
                </div>
                <div class="hr"></div>
                <div class="clear">
                {
                  this.state.product.discountType ?
                  <div>
                    <div class="price left">
                      <span>{this.state.currencyCode} {calcProductRealPrice(this.state.product).toFixed(2)}</span>
                      <span class="old">{this.state.currencyCode} {this.state.product.price.toFixed(2)}</span>
                    </div>
                    { /* If some discount time not end */
                      this.state.discountTimeLeft > 0 &&
                      <div class="counter left">
                        <span>через</span>
                        <div class="timer clear" id="timer">
                          <div class="digit hrs left">
                            {
                              this.state.discountTimeout.hours.split('').map((number, key) => (
                                <span key={key}>{number}</span>
                              ))
                            }
                          </div>
                          <span class="left">:</span>
                          <div class="digit min left">
                            {
                              this.state.discountTimeout.minutes.split('').map((number, key) => (
                                <span key={key}>{number}</span>
                              ))
                            }
                          </div>
                          <span class="left">:</span>
                          <div class="digit sec left">
                            {
                              this.state.discountTimeout.seconds.split('').map((number, key) => (
                                <span key={key}>{number}</span>
                              ))
                            }
                          </div>
                        </div>
                        <span>цена на товар <br/> изменится</span>
                      </div>
                    }
                  </div> :
                  <div class="price left">
                    <span>{this.state.currencyCode} {this.state.product.price.toFixed(2)}</span>
                  </div>
                }
                </div>
                <div class="clear buy-btns">
                  <div
                    class={classNames('btn btn-green left', {'cart-add-progress':this.state.cartAddProgress})}
                    onClick={this.addToCart.bind(this, this.state.product)}
                  >
                    {this.state.cartAddProgress ? <span>добавление...</span> : <span>добавить в корзину</span>}
                  </div>
                  <div class="btn left" onClick={this.popupBuyInClickOpen.bind(this)}>купить в один клик</div>
                </div>
                <div class="hr"></div>
                <div class="tabs-wrapper">
                  <ul class="tabs clear">
                    <li class={classNames('left', {'active': this.state.productTab === 'description'})}>
                      <a href="#tab-description" onClick={this.setProductTab.bind(this, 'description')}>описание продукта</a>
                    </li>
                    <li class={classNames('left', {'active': this.state.productTab === 'reviews'})}>
                      <a href="#tab-votes" onClick={this.setProductTab.bind(this, 'reviews')}>отзывы</a>
                    </li>
                  </ul>
                  <div class="tabs-content text-left">
                    { /* If product desctiption tab is active */
                      this.state.productTab === 'description' &&
                      <div id="tab-description" class="tab-content visible">
                        { /* If any product properties are set */
                          this.state.product.properties.length > 0 &&
                          <div class="properties">
                            { /* Display product properties */
                              this.state.product.properties.map(({label, value}, key) => (
                                <p key={key}>
                                  <span class="fw-600">{label}:</span> <span>{value}</span>
                                </p>
                              ))
                            }
                          </div>
                        }
                        <p class="text">
                          { this.state.product.briefly || <span>У этого продукта нет описания.</span> }
                        </p>
                        {
                          this.state.product.video &&
                          <div class="btn btn-youtube">
                            <a href={this.state.product.video} target="_blank"><i class="fa fa-youtube-play"></i> обзор на youtube</a>
                          </div>
                        }
                      </div>
                    }
                    { /* If product reviews tab is active */
                      this.state.productTab === 'reviews' &&
                      <div id="tab-votes" class="tab-content visible">
                        <div class="reviews-list">
                          {
                            this.state.product.reviews.map(({id, userName, review, rate, dateCreated}) => (
                              <div key={id} class="review">
                                <div>
                                  <span class="fw-600">Имя:</span> <span>{userName}</span>
                                </div>
                                <div>
                                  <span class="fw-600">Дата:</span> <span>{Moment(dateCreated * 1000).format('DD.MM.YYYY HH:mm')}</span>
                                </div>
                                <div class="clear">
                                  <span class="fw-600 left">Оценка:</span>
                                  <div class="rating left">☆☆☆☆☆<span class="progress" style={{width:`${rate*20}%`}}></span></div>
                                </div>
                                <div>
                                  <span class="fw-600">Отзыв:</span>
                                  <span>
                                    {review}
                                  </span>
                                </div>
                                <div class="hr"></div>
                              </div>
                            ))
                          }
                          <div class="heading-2">Оставить отзыв</div>
                          <div class="post-review">
                            <div class="form-row clear">
                              <span class="fw-600 left">Оценка:</span>
                              <div class="rating left">
                                {
                                  [1,2,3,4,5].map((reviewRate) => (
                                    <span
                                      key={reviewRate}
                                      class={classNames({'fix': reviewRate === this.state.reviewRate})}
                                      onClick={() => this.setState({ reviewRate })}
                                    >☆</span>
                                  ))
                                }
                          		</div>
                              { this.state.reviewSuccess && <div class="color-green right">{this.state.reviewSuccess}</div> }
                              { this.state.reviewError && <div class="right" style={{color:'#c00'}}>{this.state.reviewError}</div> }
                            </div>
                            <div class="form-row">
                              <input
                                type="text"
                                class="input w100p"
                                placeholder="Ваше имя"
                                value={this.state.reviewUserName}
                                onChange={(e) => this.setState({ reviewUserName: e.target.value })}
                              />
                            </div>
                            <div class="form-row">
                              <textarea
                                class="input textarea w100p"
                                placeholder="Ваш отзыв"
                                value={this.state.reviewComment}
                                onChange={(e) => this.setState({ reviewComment: e.target.value })}
                              ></textarea>
                            </div>
                            <div class="btn-green" onClick={this.addReview.bind(this)}>отправить отзыв</div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
              { /* Product awards */
                this.state.product.awards.length > 0 &&
                <div ref="awards" class="awards left">
                {
                  this.state.product.awards.map((picture) => (
                    <div key={picture.id} class="award">
                      <img src={buildUrl(picture)} alt="" title="" />
                    </div>
                  ))
                }
                </div>
              }
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
          <div class="text-block text-center"
               dangerouslySetInnerHTML={{ __html: this.state.product.description }} />
        </div>

        <div class="popup" ref="popup-buy-in-click">
          <i class="fa fa-remove close" onClick={(e) => {
            $(this.refs['popup-buy-in-click']).removeClass('opened');
            $('html, body').removeClass('no-scroll');
          }}></i>
          { /* Buy in one click popup */
            this.state.buyInClick.messageSuccess ?
            <div class="text-center">{this.state.buyInClick.messageSuccess}</div> :
            <div class="buy-in-click">
              <div class="form-row">
                <span class="fw-600 left">Ваше имя: *</span>
                <input
                  type="text"
                  class="input w100p"
                  placeholder="Ваше имя"
                  value={this.state.buyInClick.userName || ''}
                  onChange={(e) => {
                    this.state.buyInClick.userName = e.target.value;
                    this.setState({ buyInClick: this.state.buyInClick });
                  }}
                />
                { this.state.buyInClick.userNameError && <small class="color-red no-wrap">{this.state.buyInClick.userNameError}</small> }
              </div>
              <div class="form-row">
                <span class="fw-600 left">Номер телефона: *</span>
                <input
                  type="text"
                  class="input w100p"
                  placeholder="Номер телефона: 0501234567"
                  maxLength="10"
                  value={this.state.buyInClick.userPhone || ''}
                  onChange={(e) => {
                    this.state.buyInClick.userPhone = e.target.value;
                    this.setState({ buyInClick: this.state.buyInClick });
                  }}
                />
                { this.state.buyInClick.userPhoneError && <small class="color-red no-wrap">{this.state.buyInClick.userPhoneError}</small> }
              </div>
              <div class="btn-green" onClick={this.doBuyInClick.bind(this)}>перезвоните мне</div>
            </div>
          }
        </div>
        <div class="curtain" />

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
