import React from 'react';
import Moment from 'moment';
import classNames from 'classnames';
import queryString from 'query-string';
import { Link } from 'react-router';
import Partials from './partials';
import { buildUrl } from '../../core/helpers/Utils';
import { subscribe, unsubscribe } from '../../core/helpers/EventEmitter';
import { categories, products } from '../../actions';

export default class Category extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
      curPage: 1,
      perPage: {
        options: [20, 40, 60, 100],
        current: 20
      },
      sort: {
        field: 'dateCreated',
        ascdesc: 1,
      },
      jRange: [0, 1]
    };

    this.bootstrap = this.bootstrapListener.bind(this);
    this.filterReset();
  }

  componentWillMount() {
    subscribe('bootstrap', this.bootstrap);
  }

  componentWillUnmount() {
    unsubscribe('bootstrap', this.bootstrap);
  }

  bootstrapListener({ prices }) {

    this.filter['$and'][0].price['$gte'] = 0;
    this.filter['$and'][1].price['$lte'] = Number(prices.maxPrice);
    this.resolveState(this.props);

    this.setState({ jRange: [0, prices.maxPrice] }, () => {
      $(this.refs['price-range']).jRange({
        from: this.state.jRange[0],
        to: this.state.jRange[1],
        step: 1,
        scale: [],
        format: '%s',
        width: 'calc(100% - 25px)',
        showLabels: false,
        isRange : true,
        onstatechange: (value) => {
          var values = value.split(',');
          $(this.refs['price-range-from']).text(values[0]);
          $(this.refs['price-range-to']).text(values[1]);
        },
        ondragend: (value) => {
          // Update filter
          const [from, to] = value.split(',');
          this.filter['$and'][0].price['$gte'] = Number(from);
          this.filter['$and'][1].price['$lte'] = Number(to);

          // Update products list
          this.fetchProducts(JSON.stringify(this.filter));
        }
      });
    });
  }

  filterReset() {
    this.filter = {
      "$and": [
        {
          price: {
            "$gte": this.state.jRange[0]
          }
        },
        {
          price: {
            "$lte": this.state.jRange[1]
          }
        },
        {
          keyword: this.keyword
        }
      ]
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
    // this.resolveState(this.props);
  }

  componentWillReceiveProps(props) {
    this.resolveState(props);
  }

  resolveState(props) {
    let { page: curPage, limit: current, orderBy, ascdesc, keyword } = queryString.parse(location.search);

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

    this.keyword = '';

    // Slice only price range filter
    this.filter['$and'] = this.filter['$and'].slice(0, 2);

    // If category id set
    if (props.params.id) {
      this.filter['$and'].push({ categoryId: props.params.id });
    }

    // If search keyword set
    if (keyword) {
      this.filter['$and'].push({ keyword });
      this.keyword = keyword;
    }

    this.setState({
        curPage,
        perPage: Object.assign({ ...this.state.perPage }, { current }),
        sort: { field: orderBy, ascdesc }
      },
      () => this.fetchProducts(JSON.stringify(this.filter))
    );
  }

  fetchProducts(filter = null) {
    products(
      {
        filter,
        orderBy: this.state.sort.field,
        ascdesc: this.state.sort.ascdesc
      },
      (products) => this.setState({ products }),
      (error)  => console.error(error)
    );
  }

  // Reset price range
  filterResetHandler() {
    $(this.refs['price-range']).jRange('setValue', `${this.state.jRange[0]},${this.state.jRange[1]}`);
    this.filterReset();
    this.fetchProducts(JSON.stringify(this.filter));
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
                          ascdesc: this.state.sort.ascdesc,
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
              <div class="btn-green" onClick={this.filterResetHandler.bind(this)}><i class="fa fa-remove"></i> сбросить всё</div>
              <div class="range-wrapper">
                <div class="heading-3 fw-500">цена <span ref="price-range-from">{this.state.jRange[0]}</span> - <span ref="price-range-to">{this.state.jRange[1]}</span> грн.</div>
                <div class="range">
                  <input type="hidden" ref="price-range" class="slider-input" defaultValue={this.state.jRange[1]} />
                </div>
              </div>
              {/*
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
              */}
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
                          ascdesc: this.state.sort.ascdesc,
                          keyword: this.keyword
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
                      ascdesc: this.state.sort.ascdesc * -1,
                      keyword: this.keyword
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
                      ascdesc: this.state.sort.ascdesc * -1,
                      keyword: this.keyword
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
                              ascdesc: this.state.sort.ascdesc,
                              keyword: this.keyword
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
