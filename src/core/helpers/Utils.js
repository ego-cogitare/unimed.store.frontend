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

export function viewHistoryList(limit = 5) {
  return JSON.parse(localStorage.getItem('viewHistory') || '[]').slice(-1 * limit);
};
