// @ts-nocheck

const express = require('express');

const cartsRepo = require('../repositories/carts.repository');

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

  res.send('Product added to cart');
});

module.exports = router;
