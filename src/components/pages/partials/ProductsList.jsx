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
          this.props.products.map(({ id, slug, title, price, isNovelty, isAuction, picture, brand }, key) => {
            if (this.props.curPage && this.props.perPage && (key < (this.props.curPage - 1) * this.props.perPage || key >= this.props.curPage * this.props.perPage)) {
              return null;
            }
            return (
              <Link to={`/product/${slug}`} key={id} className={classNames('product', this.props.className || {'new': isNovelty, 'sale': isAuction} )}>
                <div class="product-wrapper">
                  <div class="picture">
                    { picture ? <img src={buildUrl(picture)} alt={title} title={title} /> : <img src={require('../../../staticFiles/img/no-picture.jpg')} alt="No picture available" title="No picture available" /> }
                  </div>
                  <div class="icon"></div>
                  <div class="title">
                    <span class="brand">{brand ? brand.title : ''}</span>
                    <span title={title}> {(title || '').substr(0, 50)}</span>
                    {(title || '').length > 50 && <span>&hellip;</span>}
                  </div>
                  <div class="price">{currencyIcon(Settings.get('currencyCode'))} {price.toFixed(2)}</div>
                  <div class="btn-green btn-buy">
                    <span>
                      {this.props.buyBtnText || 'Купить'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          }) :
          <span>Не найдено товаров удовлетворяющих критерию поиска.</span>
      }
      </div>
    );
  }
}
