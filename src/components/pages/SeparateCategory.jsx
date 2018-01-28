import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import { products, category } from '../../actions';
import { buildUrl } from '../../core/helpers/Utils';

export default class SeparateCategory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      category: {},
      products: []
    }
  }

  componentDidMount() {
    category(
      { id: this.props.params.id },
      (category) => this.setState({ category }),
      (error)  => console.error(error)
    );

    products(
      {
        filter: JSON.stringify({ categoryId: this.props.params.id }),
        orderBy: 'dateCreated',
        ascdesc: -1
      },
      (products) => this.setState({ products }),
      (error)  => console.error(error)
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle
          breadcumbs={['Главная', this.state.category.title]}
          title={this.state.category.title}
        />

        <div class="wrapper categories">
          { /* If category picture is set */
            this.state.category.picture &&
            <div class="cover">
              <img src={buildUrl(this.state.category.picture)} alt={this.state.category.title} />
            </div>
          }
          <div class="categories-list clear">
          {
            this.state.products.map(({id, title, picture}) => (
              <div key={id} class="category">
                <div class="category-wrapper">
                  <div class="heading-2">
                    <span>{title}</span>
                  </div>
                  <div class="picture">
                    <Link to={`/product/${id}`}>
                      <img src={buildUrl(picture)} alt={title} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
          <div class="text-block text-center" dangerouslySetInnerHTML={{__html: this.state.category.description || ''}} />
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
