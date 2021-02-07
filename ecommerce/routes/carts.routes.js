// @ts-nocheck

const express = require('express');

const cartsRepo = require('../repositories/carts.repository');
const productsRepo = require('../repositories/products.repository');
const layout = require('../views/layout.template');
const cartShowTemplate = require('../views/carts/show.template');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartID) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartID = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartID);
  }

  const existingItem = cart.items.find(item => item.id === req.body.productID);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productID, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartID) {
    return res.send(layout({ content: 'Your cart is empty' }));
  }

  const cart = await cartsRepo.getOne(req.session.cartID);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
  const { itemID } = req.body;
  console.log(itemID);

  const cart = await cartsRepo.getOne(req.session.cartID);

  const items = cart.items.filter(item => item.id !== itemID);
  console.log(items);

  await cartsRepo.update(req.session.cartID, { items });

  res.redirect('/cart');
});

module.exports = router;
