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
        current: 5
      },
      sort: {
        field: 'dateCreated',
        ascdesc: 1,
      },
    };
  }

  getCategory() {
    return this.state.categories.find(({ id }) => id === this.props.params.id) || {};
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
    let { page: curPage, limit: current, orderBy, ascdesc } = queryString.parse(location.search);
    if (typeof curPage === 'undefined') {
      curPage = this.state.curPage;
    }
    if (typeof current === 'undefined') {
      current = this.state.perPage.current;
    }
    if (typeof orderBy === 'undefined') {
      orderBy = this.state.sort.field;
    }
    if (typeof ascdesc === 'undefined') {
      ascdesc = this.state.sort.ascdesc;
    }
    // this.fetchProducts(cond);
    this.setState({
      curPage,
      perPage: Object.assign({ ...this.state.perPage }, { current }),
      sort: { field: orderBy, ascdesc }
    },
    () => this.fetchProducts(cond));
  }

  fetchProducts(cond = null) {
    products(
      {
        filter: cond,
        orderBy: this.state.sort.field,
        ascdesc: this.state.sort.ascdesc
      },
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
                <Link to={{ pathname: `/category`, query: {
                      page: 1,
                      limit: this.state.perPage.current,
                      orderBy: this.state.sort.field,
                      ascdesc: this.state.sort.ascdesc
                    }
                  }}
                  activeClassName="active"
                  className="heading-3 fw-600"
                >все</Link>
              </li>
              {
                this.state.categories.map(({ id, title }) => (
                  <li key={id} class="item">
                    <Link to={{ pathname: `/category/${id}`, query: {
                          page: 1,
                          limit: this.state.perPage.current,
                          orderBy: this.state.sort.field,
                          ascdesc: this.state.sort.ascdesc
                        }
                      }}
                      activeClassName="active"
                      className="heading-3 fw-600"
                    >{title}</Link>
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
                      <Link
                        to={{ pathname: `${location.pathname}`, query: {
                          page: 1,
                          limit: option,
                          orderBy: this.state.sort.field,
                          ascdesc: this.state.sort.ascdesc
                        }
                      }}>{option}</Link>
                    </li>
                  ))
                }
              </ul>
              <ul class="options">
                <li class="option title">
                  <span>Сортировать по:</span>
                </li>
                <li class={classNames('option', {
                    'active':this.state.sort.field === 'title',
                    'asc':Number(this.state.sort.ascdesc) === -1 && this.state.sort.field === 'title',
                    'desc':Number(this.state.sort.ascdesc) === 1 && this.state.sort.field === 'title'
                  })}>
                  <Link to={{ pathname: `${location.pathname}`, query: {
                      page: 1,
                      limit: this.state.perPage.current,
                      orderBy: 'title',
                      ascdesc: this.state.sort.ascdesc * -1
                    }
                  }}>Названию</Link>
                </li>
                <li class={classNames('option', {
                    'active': this.state.sort.field === 'price',
                    'asc':Number(this.state.sort.ascdesc) === -1 && this.state.sort.field === 'price', 
                    'desc':Number(this.state.sort.ascdesc) === 1 && this.state.sort.field === 'price'
                  })}>
                  <Link to={{ pathname: `${location.pathname}`, query: {
                      page: 1,
                      limit: this.state.perPage.current,
                      orderBy: 'price',
                      ascdesc: this.state.sort.ascdesc * -1
                    }
                  }}>Цене</Link>
                </li>
              </ul>
            </div>
            <div class="hr" />
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
                            to={{ pathname: `${location.pathname}`, query: {
                              page: key + 1,
                              limit: this.state.perPage.current,
                              orderBy: this.state.sort.field,
                              ascdesc: this.state.sort.ascdesc
                            }
                          }}
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
            <div class="hr" />
            <div class="text-block" dangerouslySetInnerHTML={{ __html: this.getCategory().description }} />
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
