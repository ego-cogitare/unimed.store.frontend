export function buildUrl(file) {
  return `${config.backUrl}${file.path}/${file.name}`;
};

export function currencyIcon(code) {
  const currencies = {
    'USD': '$',
    'EUR': '€',
    'UAH': '₴',
    'RUB': '₽',
  };
  return currencies[code];
};

/*
 * Viewed products hitstory add
 */
export function viewHistoryPush(product) {
  let history = JSON
    .parse(localStorage.getItem('viewHistory') || '[]')
    .filter(({ id }) => id !== product.id)
    .slice(-4);

  history.unshift({
    id: product.id,
    picture: product.picture,
    brand: product.brand,
    title: product.title,
    price: product.price,
  });

  localStorage
    .setItem('viewHistory', JSON.stringify(history));

  return history;
};

/*
 * Viewed products hitstory list
 */
export function viewHistoryList(limit = 5) {
  return JSON.parse(localStorage.getItem('viewHistory') || '[]').slice(-1 * limit);
};

/**
 * Calculate real product price depends on discount
 */
 export function calcProductRealPrice(product) {
   let price = product.price;

   if (product.discountType === 'const') {
     price = product.price - product.discount;
   }
   if (product.discountType === '%') {
     price = product.price * (1 - 0.01 * product.discount);
   }
   return price;
 };
