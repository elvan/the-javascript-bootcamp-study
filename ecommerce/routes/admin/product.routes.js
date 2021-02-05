const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products.repository');
const productsNewView = require('../../views/admin/products/new.view');
const { validateTitle, validatePrice } = require('./products.validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', (req, res) => {
  //
});

router.get('/admin/products/new', (req, res) => {
  res.send(productsNewView({ errors: null }));
});

router.post(
  '/admin/products/new',
  [validateTitle, validatePrice],
  upload.single('image'),
  async (req, res) => {
    const errors = validationResult(req);

    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    if (!errors.isEmpty()) {
      return res.send(productsNewView({ errors: errors }));
    }

    res.send('Form submitted');
  }
);

module.exports = router;
