const express = require('express');
const productsRepo = require('../../repositories/products.repository');
const productsNewView = require('../../views/admin/products/new.view');

const router = express.Router();

router.get('/admin/products', (req, res) => {
  //
});

router.get('/admin/products/new', (req, res) => {
  res.send(productsNewView({ errors: null }));
});

module.exports = router;
