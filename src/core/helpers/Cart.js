import { subscribe, dispatch } from './EventEmitter';
import { calcProductRealPrice } from './Utils';

class Cart {

  constructor() {
    // Subscribe to product add
    subscribe('cart:product:add', (product) => {
      this.addProduct(product);
      //console.log('Product added to cart:', product, this.get());
    });

    // Subscribe to product delete
    subscribe('cart:product:remove', (product) => {
      this.removeProduct(product);
      // console.log('Product removed from cart:', product, this.get());
    });

    // Broadcast cart updated event
    dispatch('cart:updated', this.get());
  }

  // Get cart object
  get() {
    const emptyCart = {
      totalCount: 0,
      totalPrice: 0,
      products: []
    };
    return JSON.parse(localStorage.getItem('cart') || JSON.stringify(emptyCart));
  }

  // Save cart object to local storage
  update(cart) {
    // Update cart total products count
    localStorage.setItem('cart', JSON.stringify(cart));

    // Broadcast cart updated event
    dispatch('cart:updated', cart);
  }

  // Add product to cart
  addProduct(product) {
    const cart = this.get();

    // If first product add
    !cart.products && Object.assign(cart, { products: [] });

    // Search for product in cart
    const cartProduct = cart.products.find(({id}) => id === product.id);

    cartProduct ? cartProduct.count++ : cart.products.push(Object.assign(product, { count: 1 }));

    // Increase product count
    cart.totalCount++;

    // Recalculate cart's products total price
    cart.totalPrice = this.productsTotalPrice(cart.products);

    // Save cart
    this.update(cart);

    return cart;
  }

  // Calculate products total price
  productsTotalPrice(products) {
    let totalPrice = 0;
    products.forEach((product) => totalPrice += product.count * calcProductRealPrice(product));

    return totalPrice;
  }

  // Remove product from cart
  removeProduct(product, removeCount = 1) {
    const cart = this.get();

    // Search for product in cart
    const cartProduct = cart.products.find(({id}) => id === product.id);

    if (!cartProduct) {
      return cart;
    }

    // Real removed products count
    let removedCount = 0;

    // If all products removing (-1) or last product removed
    if (removeCount === -1 || cartProduct.count <= removeCount) {
      removedCount = cartProduct.count;
      cart.products = cart.products.filter(({id}) => id !== product.id);
    }
    else {
      removedCount = 1;
      cartProduct.count--;
    }

    // Decrease product count
    cart.totalCount -= removedCount;

    // Recalculate cart's products total price
    cart.totalPrice = this.productsTotalPrice(cart.products);

    // Save cart
    this.update(cart);

    return cart;
  }

  getProduct(productId) {
    return this.getProducts().find(({id}) => id === productId) || null;
  }

  getProducts() {
    return this.get().products || [];
  }

  // Clear cart
  reset() {
    localStorage.setItem('cart', '');
  }
}

module.exports = new Cart;
