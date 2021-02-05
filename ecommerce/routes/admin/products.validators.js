const { check } = require('express-validator');

module.exports = {
  validateTitle: check('title')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Must be between 5 and 50 characters'),
  validatePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage('Must be a number greater than 1'),
};
