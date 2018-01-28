import React from 'react';
import Moment from 'moment';
import classNames from 'classnames';
import { Link } from 'react-router';
import Partials from './partials';
import { buildUrl } from '../../core/helpers/Utils';
import { subscribe, unsubscribe } from '../../core/helpers/EventEmitter';
import { page } from '../../actions';

export default class AboutUs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      content: ''
    };

    this.bootstrap = this.bootstrapListener.bind(this);
  }

  componentWillMount() {
    subscribe('bootstrap', this.bootstrap);
  }

  componentWillUnmount() {
    unsubscribe('bootstrap', this.bootstrap);
  }

  loadPage(pageId) {
    page(
      { id: pageId },
      ({body}) => this.setState({ content: body }),
      (e) => console.error(e)
    );
  }

  componentDidMount() {
    // If page id is provided - load page contents
    this.props.params.id && this.loadPage(this.props.params.id);
  }

  componentWillReceiveProps(props) {
    // If page id set
    props.params.id && this.loadPage(props.params.id);
  }

  // On meno is loaded
  bootstrapListener({ menus }) {
    this.setState({
        menu: menus['5a6da24fc7125460ffb53faa']
      },
      // If display page id not set - show first page from menu
      () => !this.props.params.id && this.loadPage(this.state.menu.children[0].link.split('/').pop())
    );
  }

  render() {
    return (
      <section>
        <Partials.PageTitle breadcumbs={['Главная', 'О нас']} title="О нас" />

        <div class="wrapper catalog clear">
          <div class="sitebar">
            <ul class="menu">
              {
                ((this.state.menu || []).children || []).map(({ id, link, title }, key)=>(
                  <li key={id} class="item">
                    <Link to={link} className={classNames('heading-3 fw-600', { 'active': !this.props.params.id && !key })} activeClassName="active">{title}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div class="content">
            <div class="text-block" dangerouslySetInnerHTML={{__html: this.state.content}} />
          </div>
        </div>

        <Partials.AdvertisingServices />
      </section>
    );
  }
}
