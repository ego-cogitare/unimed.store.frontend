import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router';
import Layout from './components/pages/Layout.jsx';
import Routes from './config/routes';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      { Routes.map((route, key) => (
          <Route path={route.path} key={key} getComponent={route.resolve} />
        ))
      }
    </Route>
  </Router>,
  document.getElementById('app')
);
