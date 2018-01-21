import React from 'react';
import Moment from 'moment';
import classNames from 'classnames';
import queryString from 'query-string';
import { Link } from 'react-router';
import Partials from './partials';
import { buildUrl } from '../../core/helpers/Utils';
import { categories, products } from '../../actions';

export default class Category extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
      curPage: 1,
      perPage: {
        options: [1, 2, 5],
        current: 1
      },
      sortBy: {
        name: 1,
        price: -1,
      },
    };
  }

  componentDidMount() {
    categories(
      { orderBy: 'order', ascdesc: 1 },
      (categories) => this.setState({ categories }),
      (error)  => console.error(error)
    );
    this.resolveState(this.props);
  }

  componentWillReceiveProps(props) {
    this.resolveState(props);
  }

  resolveState(props) {
    const cond = props.params.id ? `{"categoryId":"${props.params.id}"}` : null;
    const { page: curPage, limit: current } = queryString.parse(location.search);
    this.fetchProducts(cond);
    this.setState({ curPage, perPage: Object.assign({ ...this.state.perPage }, { current }) });
  }

  fetchProducts(cond = null) {
    products(
      { filter: cond, orderBy: 'dateCreated', ascdesc: -1 },
      (products) => this.setState({ products }),
      (error)  => console.error(error)
    );
  }

  perPageChange(index, e) {
    e.preventDefault();

    let paginating = this.state.perPage;
    paginating.current = paginating.options[index];
    this.setState({
      perPage: paginating ,
      curPage: 1
    });
  }

  switchPage(curPage, e) {
    e.preventDefault();
    this.setState({ curPage });
  }

  render() {
    const category = (this.state.categories.find(({id}) => id === this.props.params.id) || {}).title || 'Все';

    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'Каталог', category]} title={category} />

        <div class="wrapper catalog clear">
          <div class="sitebar">
            <ul class="menu">
              <li class="item">
                <Link
                  to={{ pathname: `/category`, query: { page: this.state.curPage, limit: this.state.perPage.current } }}
                  activeClassName="active"
                  className="heading-3 fw-600">все</Link>
              </li>
              {
                this.state.categories.map(({ id, title }) => (
                  <li key={id} class="item">
                    <Link
                      to={{ pathname: `/category/${id}`, query: { page: this.state.curPage, limit: this.state.perPage.current } }}
                      activeClassName="active"
                      className="heading-3 fw-600">{title}</Link>
                  </li>
                ))
              }
            </ul>
            <div class="filter">
              <div class="btn-green"><i class="fa fa-remove"></i> сбросить всё</div>
              <div class="range-wrapper">
                <div class="heading-3 fw-500">цена <span id="price-range-from">0</span> - <span id="price-range-to">900</span> грн.</div>
                <div class="range">
                  <input type="hidden" id="price-range" class="slider-input" value="750" />
                </div>
              </div>
              <div class="tags-wrapper">
                <div class="heading-3 fw-500">размер:</div>
                <ul class="tags">
                  <li class="tag">
                    <input type="checkbox" id="size-xs" value="" />
                    <label for="size-xs">XS</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="size-s" value="" />
                    <label for="size-s">S</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="size-m" value="" />
                    <label for="size-m">M</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="size-l" value="" />
                    <label for="size-l">L</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="size-xl" value="" />
                    <label for="size-xl">XL</label>
                  </li>
                </ul>
              </div>
              <div class="tags-wrapper">
                <div class="heading-3 fw-500">цвет:</div>
                <ul class="tags">
                  <li class="tag">
                    <input type="checkbox" id="color-1" value="" />
                    <label for="color-1">Черный</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="color-2" value="" />
                    <label for="color-2">Хаки</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="color-3" value="" />
                    <label for="color-3">Розовый</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="color-4" value="" />
                    <label for="color-4">Желтый</label>
                  </li>
                  <li class="tag">
                    <input type="checkbox" id="color-5" value="" />
                    <label for="color-5">Белый</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="catalog-options">
              <ul class="options">
                <li class="option title">
                  <span>Показывать по:</span>
                </li>
                {
                  this.state.perPage.options.map((option, key) => (
                    <li key={key} class={classNames('option', {'active': option === Number(this.state.perPage.current)})}>
                      <Link to={{ pathname: `${location.pathname}`, query: { page: 1, limit: option } }}>{option}</Link>
                    </li>
                  ))
                }
              </ul>
              <ul class="options">
                <li class="option title">
                  <span>Сортировать по:</span>
                </li>
                <li class="option desc">
                  <span>Названию</span>
                </li>
                <li class="option asc">
                  <span>Цене</span>
                </li>
              </ul>
            </div>
            <div class="hr"></div>
            <Partials.ProductsList
              products={this.state.products}
              curPage={this.state.curPage}
              perPage={this.state.perPage.current}
            />
            {
              this.state.perPage.current < this.state.products.length ?
                <div class="pagination">
                  <div class="page prev">
                    <a href="#" class="fa fa-angle-left"></a>
                  </div>
                  {
                    this.state.products.map(({}, key) => {
                      if (key > Math.floor(this.state.products.length / this.state.perPage.current)) {
                        return null;
                      }
                      return (
                        <div key={key} class={classNames('page', {'active': key === this.state.curPage - 1})}>
                          <Link
                            to={{ pathname: `${location.pathname}`, query: { page: key + 1, limit: this.state.perPage.current } }}
                          >{key + 1}</Link>
                        </div>
                      );
                    })
                  }
                  <div class="page next">
                    <a href="#" class="fa fa-angle-right"></a>
                  </div>
                </div> :
                null
            }
            <div class="hr"></div>
            {

            }
            <div class="text-block">
              <div class="heading-3 fw-600">
                Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь <br/>от всего сердца.
              </div>
              <p class="text">
                Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: "Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!"
              </p>
            </div>
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
