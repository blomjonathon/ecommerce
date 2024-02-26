const { Product } = require('../models');

//create some dummy product data

const productData = [
  {
    product_name: 'White T-Shirt',
    price: 13.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: 'Running Shoes',
    price: 49.0,
    stock: 26,
    category_id: 5,
  },
  {
    product_name: 'Baseball Hat',
    price: 30.99,
    stock: 13,
    category_id: 4,
  },
  {
    product_name: 'Top 30 Music Compilation Vinyl Record',
    price: 5.99,
    stock: 100,
    category_id: 3,
  },
  {
    product_name: 'Cargo Pants',
    price: 25.99,
    stock: 14,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
