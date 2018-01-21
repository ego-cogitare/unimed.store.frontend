import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { buildUrl, currencyIcon } from '../../../core/helpers/Utils';
import Settings from '../../../core/helpers/Settings';

export default class ProductsList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="products-list">
      {
        this.props.products.length > 0 ?
          this.props.products.map(({ id, title, price, isNovelty, isAuction, picture, brand }, key) => {
            if (this.props.curPage && this.props.perPage && (key < (this.props.curPage - 1) * this.props.perPage || key >= this.props.curPage * this.props.perPage)) {
              return null;
            }
            return (
              <div key={id} class={classNames('product', this.props.className || {'new': isNovelty, 'sale': isAuction} )}>
                <div class="product-wrapper">
                  <div class="picture">
                    <Link to={`/product/${id}`}>
                      { picture && <img src={buildUrl(picture)} alt={title} /> }
                    </Link>
                  </div>
                  <div class="icon"></div>
                  <div class="title"><span class="brand">{brand ? brand.title : ''}</span> {title}</div>
                  <div class="price">{currencyIcon('USD')} {price.toFixed(2)}</div>
                  <div class="btn-green btn-buy">
                    <Link to={`/product/${id}`}>
                      {this.props.buyBtnText || 'Купить'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          }) :
          <span>Не найдено товаров удовлетворяющих критерию поиска.</span>
      }
      </div>
    );
  }
}
