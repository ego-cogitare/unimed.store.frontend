import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
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
                  if (e.which === 13 && e.target.value.length >=3) {
                    location.href = `/category?keyword=${e.target.value}`;
                  }
                }}
                defaultValue="" placeholder="Искать..." />
            </li>
            <li class="delimiter">
              <i></i>
            </li>
            <li class="cart">
              <i class="fa fa-shopping-basket" data-count="2"></i>
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
