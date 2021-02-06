// @ts-nocheck

const express = require('express');
const multer = require('multer');

const productsRepo = require('../../repositories/products.repository');
const productsIndexView = require('../../views/admin/products/index.view');
const productsNewView = require('../../views/admin/products/new.view');
const productsEditView = require('../../views/admin/products/edit.view');
const { validateTitle, validatePrice } = require('./products.validators');
const { handleErrors, requireAuth } = require('./admin.middlewares');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await productsRepo.getAll();
  res.send(productsIndexView({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(productsNewView({ errors: null }));
});

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [validateTitle, validatePrice],
  handleErrors(productsNewView),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await productsRepo.create({ title, price, image });

    res.redirect('/admin/products');
  }
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
  const product = await productsRepo.getOne(req.params.id);

  if (!product) {
    return res.send('Product not found');
  }

  res.send(productsEditView({ product }));
});

router.post('/admin/products/:id/edit', requireAuth, async (req, res) => {});

module.exports = router;
