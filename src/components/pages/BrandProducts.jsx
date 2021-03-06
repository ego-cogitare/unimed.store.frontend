import React from 'react';
import { Link } from 'react-router';
import Partials from './partials';
import { products, brand } from '../../actions';
import { buildUrl } from '../../core/helpers/Utils';

export default class BrandProducts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      brand: {},
      products: []
    }
  }

  componentDidMount() {
    brand(
      { id: this.props.params.id },
      (brand) => this.setState({ brand },() => {
        products(
          {
            filter: JSON.stringify({ brandId: this.state.brand.id }),
            orderBy: 'dateCreated',
            ascdesc: -1
          },
          (products) => this.setState({ products }),
          (error)  => console.error(error)
        );
      }),
      (error)  => console.error(error)
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle
          breadcumbs={[<Link to='/'>Главная </Link>, this.state.brand.title]}
          title={this.state.brand.title}
        />

        <div class="wrapper categories">
          { /* If category picture is set */
            this.state.brand.cover &&
            <div class="cover">
              <img src={buildUrl(this.state.brand.cover)} alt={this.state.brand.title} title={this.state.brand.title} />
            </div>
          }
          <div class="categories-list clear">
          {
            this.state.products.map(({id, slug, title, picture}) => (
              <div key={id} class="category">
                <div class="category-wrapper">
                  <div class="heading-2">
                    <span>{title}</span>
                  </div>
                  <div class="picture">
                    <Link to={`/product/${slug}`}>
                      <img src={buildUrl(picture)} alt={title} title={title} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
          <div class="text-block text-center" dangerouslySetInnerHTML={{__html: this.state.brand.description || ''}} />
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
