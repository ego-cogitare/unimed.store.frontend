import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import { brands, products, blog } from '../../actions';
import { buildUrl } from '../../core/helpers/Utils';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.actionProducts = {
      list: [],
      perPage: 5,
      offset: 0,
    };

    this.state = {
      brands: [],
      posts: [],
      productsNew: [],
      productsAction: [],
      productsActionMore: true,
    };
  }

  initBrandsSlider() {
    if ($(this.refs['brands-slider']).length !== 0)
    {
      var brandSlider = new Swiper(this.refs['brands-slider'], {
        direction: 'horizontal',
        slidesPerView: 6,
        nextButton: $(this.refs['brands-slider']).find('.btn-next'),
        prevButton: $(this.refs['brands-slider']).find('.btn-prev'),
        paginationClickable: true,
        loop: false,
        spaceBetween: 4,
        mousewheelControl: false,
        speed: 1000,
        autoResize: false,
        resizeReInit: true,
        onSlideChangeStart: (swiper) => {
          $(this.refs['brands-slider']).find('.slider-arrow').removeClass('hide');
          if (swiper.isBeginning) {
            $(this.refs['brands-slider']).find('.btn-prev').addClass('hide');
          }
          if (swiper.isEnd) {
            $(this.refs['brands-slider']).find('.btn-next').addClass('hide');
          }
        }
      });

      $(window).bind('resize', function() {
        var width = $('body').width();

        if (width >= 1680)                      brandSlider.params.slidesPerView = 6;
        else if (width >= 1367 && width < 1680) brandSlider.params.slidesPerView = 5;
        else if (width > 1024 && width < 1367)  brandSlider.params.slidesPerView = 4;
        else if (width >= 768 && width <= 1024) brandSlider.params.slidesPerView = 3;
        else                                    brandSlider.params.slidesPerView = 1;
        brandSlider.update();
      });
      $(window).trigger('resize');
    }
  }

  componentDidMount() {
    // Get list of brands
    brands(
      {},
      (brands) => this.setState({ brands }, this.initBrandsSlider),
      (error)  => console.error(error)
    );

    // Get list of new products
    products(
      { filter: '{"isNovelty": true}' },
      (products) => this.setState({ productsNew: products }),
      (error)  => console.error(error)
    );

    // Get list of action products
    products(
      { filter: '{"isAuction": true}' },
      (products) => {
        Object.assign(this.actionProducts, {
          list: products,
          offset: this.actionProducts.perPage
        });
        this.setState({
          productsActionMore: products.length > this.actionProducts.perPage,
          productsAction: products.slice(0, this.actionProducts.perPage)
        });
      },
      (error)  => console.error(error)
    );

    // Get list of posts
    blog(
      { filter: '{"showOnHome": true}' },
      (posts) => this.setState({ posts }),
      (error)  => console.error(error)
    );
  }

  actionProductsLoad() {
    const newOffset = this.actionProducts.offset + this.actionProducts.perPage;
    this.setState({
        productsActionMore: newOffset < this.actionProducts.list.length,
        productsAction: this.actionProducts.list
          .slice(0, newOffset)
      },
      () => this.actionProducts.offset = newOffset
    );
  }

  render() {
    return (
      <section>
        <div class="wrapper">
          <Partials.HomeSlider />
        </div>

        <Partials.AdvertisingServices />

        <div class="wrapper">
          <Partials.BlockTitle title="Наши бренды" />
        </div>
        <div class="wrapper">
          <div ref="brands-slider" id="brands-slider" class="swiper-container">
            <div class="swiper-wrapper">
            {
              this.state.brands.map(({ id, picture, title }) => (
                <Link to={`/brand/${id}`} key={id} class="swiper-slide" style={{ backgroundImage: "url('" + buildUrl(picture) + "')" }}>
                  <div class="figure"></div>
                  <div class="title">{title}</div>
                  <div class="btn-green">
                    <span>подробнее</span>
                  </div>
                </Link>
              ))
            }
            </div>
            <div class="slider-arrow btn-prev hide">
              <img src={require('../../staticFiles/img/home/slider/left-arrow.png')} alt="Previous" />
            </div>
            <div class="slider-arrow btn-next">
              <img src={require('../../staticFiles/img/home/slider/right-arrow.png')} alt="Next" />
            </div>
          </div>
        </div>
        { this.state.productsNew.length > 0 &&
          <div>
            <div class="wrapper">
              <Partials.BlockTitle title="Новинки" description="впервые в продаже" />
            </div>
            <div class="wrapper">
              <Partials.ProductsList
                products={this.state.productsNew}
                className="new"
              />
            </div>
          </div>
        }
        { this.state.productsAction.length > 0 &&
          <div>
            <div class="wrapper">
              <Partials.BlockTitle title="Акция" description="акционные товары" />
            </div>
            <div class="wrapper">
              <Partials.ProductsList
                products={this.state.productsAction}
                className="sale"
              />
            </div>
            <div class="wrapper btns-section btns-products">
              { this.state.productsActionMore &&
                <div class="btn load-more" onClick={this.actionProductsLoad.bind(this)}>
                  загрузить еще
                </div>
              }
              <Link to={{ pathname: '/category', query: {
                  page: 1,
                  limit: 20,
                  orderBy: 'title',
                  ascdesc: 1,
                  customFilter: JSON.stringify({ isAuction: true }),
                }
              }}
              className="btn btn-green see-all">посмотреть все</Link>
            </div>
          </div>
        }
        <div class="wrapper">
          <Partials.BlockTitle title="Блог" description="полезные статьи" />
        </div>
        <div class="wrapper">
          <div class="blog-preview">
          {
            this.state.posts.map(({ id, title, briefly, picture, pictureId }) => (
              <Link to={`/post/${id}`} key={id} class="post">
                <div class="picture">
                    <img src={buildUrl(picture)} alt={title} />
                </div>
                <div class="title">
                  {title}
                </div>
                <div
                  class="description"
                  dangerouslySetInnerHTML={{
                    __html: briefly.length > 180 ? briefly.slice(0, 180).concat('&hellip;') : briefly
                  }}
                />
              </Link>
            ))
          }
          </div>
        </div>
        <div class="wrapper btns-section btns-blog">
          <div class="btn read-all">
            <Link to="/blog">читать все</Link>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
