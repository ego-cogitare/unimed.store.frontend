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
