const { products } = require("./products");

class Cart {
  constructor() {
    this.items = {};
  }

  add(id, qty) {
    if (!this.items[id]) this.items[id] = 0;
    this.items[id] += qty;
  }

  remove(id) {
    delete this.items[id];
  }

  clear() {
    this.items = {};
  }

  getItems() {
    return Object.keys(this.items).map(id => {
      const prod = products.find(p => p.id === id);
      return {
        id,
        name: prod ? prod.name : "Unknown",
        price: prod ? prod.price : 0,
        qty: this.items[id]
      };
    });
  }

  getTotal(items) {
    return items.reduce((acc, x) => acc + x.price * x.qty, 0);
  }
}

exports.Cart = Cart;
