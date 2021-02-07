// @ts-nocheck

const express = require('express');

const productsRepo = require('../repositories/products.repository');
const productsIndexTemplate = require('../views/products/index.template');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});

module.exports = router;
