import React from 'react';
// import Partials from './partials';
// import UI from '../../core/ui';
import Settings from '../../core/helpers/Settings';
import { subscribe, dispatch } from '../../core/helpers/EventEmitter';
import { get } from '../../actions/Settings';
import '../../staticFiles/js/app';

export default class Layout extends React.Component {

  // Get bootstrap settings
  componentDidMount() {
    subscribe('settings:sync', () => {
      get(
        (config) => Settings.apply(config),
        (e) => {
          dispatch('notification:throw', {
            type: 'danger',
            title: 'Ошибка',
            message: e.responseJSON.error
          });
        }
      );
    });

    dispatch('settings:sync');
  }

  render() {
    return (
       <div className="hold-transition skin-blue sidebar-mini layout-boxed">

         a
         {/*
         <UI.Notifications limit="3" />
         <UI.Popup />
         <div className="wrapper">
          <Partials.Header />
          <Partials.LeftMenu />
          <Partials.Content children={this.props.children} />
          <Partials.Footer />
        </div>
        */}
      </div>
    );
  }
}
