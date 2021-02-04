const { check } = require('express-validator');

module.exports = {
  validateTitle: check('title').trim().isLength({ min: 5, max: 50 }),
  validatePrice: check('price').trim().toFloat().isFloat(),
};
