import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { subscribe, unsubscribe } from '../../../core/helpers/EventEmitter';
import Phones from './Phones.jsx';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cart: cart.get()
    };

    this.cartUpdate = this.cartUpdateListener.bind(this);
  }

  componentWillMount() {
    subscribe('cart:updated', this.cartUpdate);
  }

  componentDidMount() {
    $(this.refs['search']).on('click', function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('expanded')
        .parent().siblings('.menu').toggleClass('fadeout');
    });
  }

  componentWillUnmount() {
    unsubscribe('cart:updated', this.cartUpdate);
  }

  cartUpdateListener(cart) {
    this.setState({ cart })
  }

  render() {
    return (
      <header>
        <div class="header wrapper clear">
          <div class="logo">
            <Link to="/">
              <img src={require('../../../staticFiles/img/header-logo.png')} alt="UNIMED" title="UNIMED" />
            </Link>
          </div>
          <ul class="search-cart right">
            <li class="search">
              <i class="fa fa-search" ref="search"></i>
              <input
                type="text"
                id="keyword"
                class="input"
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
              <Link class={classNames('fa fa-shopping-basket', {'empty-cart':!this.state.cartProductCount})} data-count={this.state.cart.totalCount} to="/checkout"></Link>
            </li>
          </ul>
          <div class="menu right">
            <ul>
              {
                ((this.props.data.menu || []).children || []).map(({ id, link, title })=>(
                  <li key={id} class="item">
                    <Link to={link} activeClassName="active">{title}</Link>
                  </li>
                ))
              }
            </ul>
            <Phones />
          </div>
        </div>
      </header>
    );
  }
}
