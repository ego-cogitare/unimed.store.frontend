import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div class="header wrapper clear">
          <div class="logo">
            <a href="#">
              <img src={require('../../../staticFiles/img/header-logo.png')} alt="UNIMED" />
            </a>
          </div>
          <ul class="search-cart right">
            <li class="search">
              <i class="fa fa-search"></i>
              <input type="text" id="keyword" class="input" name="q" value="" placeholder="Искать..." />
            </li>
            <li class="delimiter">
              <i></i>
            </li>
            <li class="cart">
              <i class="fa fa-shopping-basket" data-count="2"></i>
            </li>
          </ul>
          <ul class="menu right">
            <li class="item">
              <a href="#">для красоты</a>
            </li>
            <li class="item">
              <a href="#">для дома</a>
            </li>
            <li class="item">
              <a href="#">для детей</a>
            </li>
            <li class="item">
              <a href="#">для мужчин</a>
            </li>
            <li class="item">
              <a href="#">акции</a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
