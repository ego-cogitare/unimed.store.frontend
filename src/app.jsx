import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './components/pages/Layout.jsx';
import Routes from './config/routes';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      { Routes.map((route, key) => (
          <Route path={route.path} key={key} getComponent={route.resolve} />
        ))
      }
      <IndexRoute getComponent={Routes[0].resolve} />
    </Route>
  </Router>,
  document.getElementById('app')
);
