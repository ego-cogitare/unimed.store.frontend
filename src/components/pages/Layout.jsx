import React from 'react';
import Settings from '../../core/helpers/Settings';
import Partials from './partials';
import { subscribe, dispatch } from '../../core/helpers/EventEmitter';
import { bootstrap } from '../../actions/bootstrap';
import '../../staticFiles/js/app';
import '../../staticFiles/css/main.css';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menus: {}
    };
  }

  // Get bootstrap settings
  componentDidMount() {
    bootstrap(
      (data) => {
        dispatch('bootstrap', data);
        Settings.apply(data);
        this.setState({ menus: data.menus });
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
    return (
       <div>
         <Partials.HeaderMenu data={{ menu: this.state.menus['5a55ff531d41c878ac6206a2'] }} />
         <Partials.Header data={{ menu: this.state.menus['5a5600631d41c878aa666c63'] }} />
         <Partials.Content children={this.props.children} />
         <Partials.Footer data={{ menu: this.state.menus['5a57435b7f36602a06cdb929'] }} />
      </div>
    );
  }
}
