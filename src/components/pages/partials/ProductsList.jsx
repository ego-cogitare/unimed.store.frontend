import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { buildUrl } from '../../../core/helpers/Utils';

export default class ProductsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="products-list">
      {
        this.props.products.map(({ id, title, price, picture, brand }) => (
          <div key={id} class={classNames('product', this.props.className)}>
            <div class="product-wrapper">
              <div class="picture">
                <Link to={'/product/'.concat(id)}>
                  { picture && <img src={buildUrl(picture)} alt={title} /> }
                </Link>
              </div>
              <div class="icon"></div>
              <div class="title"><span class="brand">{brand ? brand.title : ''}</span> {title}</div>
              <div class="price">{price}</div>
              <div class="btn-green btn-buy">
                <a href="#">{this.props.buyBtnText || 'Купить'}</a>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    );
  }
}
