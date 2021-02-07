const express = require('express');

const router = express.Router();

router.post('/cart/products', (req, res) => {
  console.log(req.body.productID);

  res.send('Product added to cart');
});

module.exports = router;
