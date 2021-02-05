// @ts-nocheck

const express = require('express');

const { handleErrors } = require('./admin.middlewares');
const usersRepo = require('../../repositories/users.repository');
const signinView = require('../../views/admin/auth/signin.view');
const signupView = require('../../views/admin/auth/signup.view');
const {
  validateSignUpEmail,
  validateSignUpPassword,
  validatePasswordConfirmation,
  validateSignInEmail,
  validateSignInPassword,
} = require('./auth.validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupView({ req }));
});

router.post(
  '/signup',
  [validateSignUpEmail, validateSignUpPassword, validatePasswordConfirmation],
  handleErrors(signupView),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await usersRepo.create({ email: email, password: password });

    req.session.userID = user.id;

    res.redirect('/admin/products');
  }
);

router.get('/signin', (req, res) => {
  res.send(signinView({}));
});

router.post(
  '/signin',
  [validateSignInEmail, validateSignInPassword],
  handleErrors(signinView),
  async (req, res) => {
    const user = await usersRepo.getOneBy({ email: req.body.email });
    if (!user) {
      return res.send('Email not found');
    }

    req.session.userID = user.id;
    res.redirect('/admin/products');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
