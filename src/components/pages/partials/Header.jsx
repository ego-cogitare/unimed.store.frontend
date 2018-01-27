import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { subscribe } from '../../../core/helpers/EventEmitter';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cartProductCount: cart.get().totalCount
    };
  }

  componentDidMount() {
    subscribe('cart:updated', (cart) => {
      this.setState({ cartProductCount: cart.totalCount })
    });
  }

  render() {
    return (
      <header>
        <div class="header wrapper clear">
          <div class="logo">
            <Link to="/">
              <img src={require('../../../staticFiles/img/header-logo.png')} alt="UNIMED" />
            </Link>
          </div>
          <ul class="search-cart right">
            <li class="search">
              <i class="fa fa-search"></i>
              <input type="text" id="keyword" class="input"
                name="keyword"
                onKeyDown={(e) => {
                  if (e.which === 13 && e.target.value.length >= 3) {
                    location.href = `/category?keyword=${e.target.value}`;
                  }
                }}
                defaultValue="" placeholder="Искать..." />
            </li>
            <li class="delimiter">
              <i></i>
            </li>
            <li class="cart">
              <Link class={classNames('fa fa-shopping-basket', {'empty-cart':!this.state.cartProductCount})} data-count={this.state.cartProductCount} to="/checkout"></Link>
            </li>
          </ul>
          <ul class="menu right">
            {
              ((this.props.data.menu || []).children || []).map(({ id, link, title })=>(
                <li key={id} class="item">
                  <Link to={link} activeClassName="active">{title}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </header>
    );
  }
}
