import React from 'react';
import Settings from '../../core/helpers/Settings';
import Partials from './partials';
import { dispatch } from '../../core/helpers/EventEmitter';
import { bootstrap } from '../../actions/bootstrap';
import '../../staticFiles/css/main.css';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menus: {},
      pageLoaded: false
    };
  }

  // Get bootstrap settings
  componentDidMount() {
    this.getBootstrapData();
  }

  componentWillReceiveProps(props) {
    this.getBootstrapData();
    $(window).scrollTop(0);
  }

  getBootstrapData() {
    bootstrap(
      (data) => {
        Settings.apply(data.settings);
        this.setState({
            menus: data.menus,
            pageLoaded: true
          },
          () => $(window).scrollTop(0)
        );
        dispatch('bootstrap', data);
      },
      (e) => {
        dispatch('notification:throw', {
          type: 'danger',
          title: 'Ошибка',
          message: e.responseJSON.error
        });
      }
    );
  }

  render() {
    if (this.state.pageLoaded) {
      return (
        <div>
          <Partials.HeaderMenu data={{ menu: this.state.menus['5a55ff531d41c878ac6206a2'] }} />
          <Partials.Header data={{ menu: this.state.menus['5a5600631d41c878aa666c63'] }} />
          <Partials.Content children={this.props.children} />
          <Partials.Footer data={{ menu: this.state.menus['5a57435b7f36602a06cdb929'] }} />
        </div>
      );
    }
    return null;
  }
}
