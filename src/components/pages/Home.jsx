import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import { brands, products, blog } from '../../actions';
import { buildUrl } from '../../core/helpers/Utils';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      posts: [],
      productsNew: [],
      productsAction: [],
    };
  }

  componentDidMount() {
    // Get list of brands
    brands(
      {},
      (brands) => this.setState({ brands }),
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
      (products) => this.setState({ productsAction: products }),
      (error)  => console.error(error)
    );

    // Get list of posts
    blog(
      { filter: '{"showOnHome": true}' },
      (posts) => this.setState({ posts }),
      (error)  => console.error(error)
    );
  }

  render() {
    return (
      <section>
        <Partials.AdvertisingServices />

        <Partials.BlockTitle title="Наши бренды" />
        <div class="wrapper">
          <div id="brands-slider" class="swiper-container">
            <ul class="swiper-wrapper">
            {
              this.state.brands.map(({ id, picture, title }) => (
                <li key={id} class="swiper-slide" style={{ backgroundImage: "url('" + buildUrl(picture) + "')" }}>
                  <div class="figure"></div>
                  <div class="title">{title}</div>
                  <div class="btn-green">
                    <a href="#">подробнее</a>
                  </div>
                </li>
              ))
            }
            </ul>
            <div class="slider-arrow btn-prev hide">
              <img src={require('../../staticFiles/img/home/slider/left-arrow.png')} alt="Previous" />
            </div>
            <div class="slider-arrow btn-next">
              <img src={require('../../staticFiles/img/home/slider/right-arrow.png')} alt="Next" />
            </div>
          </div>
        </div>

        <Partials.BlockTitle title="Новинки" description="впервые в продаже" />
        <div class="wrapper">
          <div class="wrapper">
            <Partials.ProductsList
              products={this.state.productsNew}
              className="new"
            />
          </div>
        </div>

        <Partials.BlockTitle title="Акция" description="лимитированные товары" />
        <div class="wrapper">
          <Partials.ProductsList
            products={this.state.productsAction}
            className="sale"
          />
        </div>
        <div class="wrapper btns-section btns-products">
          <div class="btn load-more">
            загрузить еще
          </div>
          <div class="btn btn-green see-all">
            посмотреть все
          </div>
        </div>

        <Partials.BlockTitle title="Блог" description="полезные статьи" />
        <div class="wrapper">
          <div class="blog-preview">
          {
            this.state.posts.map(({ id, title, briefly, pictures, pictureId }) => (
              <div key={id} class="post">
                <div class="picture">
                  <Link to={`/post/${id}`}>
                    { pictures.length > 0 && <img src={buildUrl(pictures.find(({id}) => id === pictureId) || pictures[0])} alt={title} /> }
                  </Link>
                </div>
                <div class="title">
                  {title}
                </div>
                <div class="description">
                  {briefly}
                </div>
              </div>
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
