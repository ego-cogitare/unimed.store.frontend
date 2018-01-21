import React from 'react';

const routes = {
  // Default routes list
  default: [
    {
      path: 'home',
      component: require('../components/pages/Home.jsx').default
    },
    {
      path: 'contacts',
      component: require('../components/pages/Contacts.jsx').default
    },
    {
      path: 'blog',
      component: require('../components/pages/Blog.jsx').default
    },
    {
      path: 'category(/:id)',
      component: require('../components/pages/Category.jsx').default
    },
  ],
  // Custom route component handler depending of the user type
  custom: {
    ROLE_DEFAULT: {
      available: '*'
    },
    ROLE_AUTHORIZED: {
    },
  },


  resolve: function (route) {
    // Get logged user data
    const loggedUser = {
      role: 'ROLE_DEFAULT'
    };

    // Check if route available for the user
    if (this.custom[loggedUser.role].available !== '*' && this.custom[loggedUser.role].available.indexOf(route) === -1) {
      return () => <div>Not available.</div>;
    }

    // Get custom component for the current user rolename and route path
    const customRoute = (this.custom[loggedUser.role].override || []).filter((r) => r.path === route);

    // If custom route found
    if (customRoute.length > 0) {
      return customRoute[0].component;
    }

    // Return default route component
    return this.default.filter((r) => r.path === route)[0].component;
  }
};

// Creating routes list
module.exports = routes.default.map((route) => {
  return {
    path: route.path,
    resolve: (nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, routes.resolve(route.path));
      });
    }
  };
});
