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
      path: ['about-us(/:id)', 'delivery(/:id)'],
      component: require('../components/pages/WithMenu.jsx').default
    },
    {
      path: 'blog',
      component: require('../components/pages/Blog.jsx').default
    },
    {
      path: 'post/:id',
      component: require('../components/pages/Post.jsx').default
    },
    {
      path: 'category(/:id)',
      component: require('../components/pages/Category.jsx').default
    },
    {
      path: 'catalog/:id',
      component: require('../components/pages/SeparateCategory.jsx').default
    },
    {
      path: 'brand/:id',
      component: require('../components/pages/BrandProducts.jsx').default
    },
    {
      path: 'product/:id',
      component: require('../components/pages/Product.jsx').default
    },
    {
      path: 'checkout',
      component: require('../components/pages/Checkout.jsx').default
    },
    {
      path: 'checkout/thanks',
      component: require('../components/pages/Thanks.jsx').default
    },
    {
      path: '/payment/liqpay/:id',
      component: require('../components/pages/LiqPay.jsx').default
    },
  ],

  resolve: function (route) {
    // Return default route component
    const component = this.default.filter(
      (r) => r.path === route || r.path.indexOf(route) !== -1
    )[0].component;

    return component;
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
