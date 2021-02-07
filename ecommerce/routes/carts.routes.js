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

  console.log(cart);

  res.send('Product added to cart');
});

module.exports = router;
