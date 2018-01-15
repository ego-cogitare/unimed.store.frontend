import React from 'react';
import Settings from '../../core/helpers/Settings';
import Partials from './partials';
import { subscribe, dispatch } from '../../core/helpers/EventEmitter';
import { bootstrap } from '../../actions/bootstrap';
import '../../staticFiles/js/app';
import '../../staticFiles/css/main.css';

export default class Layout extends React.Component {

  // Get bootstrap settings
  componentDidMount() {
    subscribe('bootstrap', () => {
      bootstrap(
        (data) => Settings.apply(data),
        (e) => {
          dispatch('notification:throw', {
            type: 'danger',
            title: 'Ошибка',
            message: e.responseJSON.error
          });
        }
      );
    });

    dispatch('bootstrap');
  }

  render() {
    return (
       <div>
         <Partials.HeaderMenu />
         <Partials.Header />
         <Partials.AdvertisingServices />
         <Partials.Footer />
      </div>
    );
  }
}
