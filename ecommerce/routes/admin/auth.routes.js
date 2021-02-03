// @ts-nocheck

const express = require('express');
const { check, validationResult } = require('express-validator');

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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupView({ req, errors }));
    }

    const { email, password } = req.body;

    const user = await usersRepo.create({ email: email, password: password });

    req.session.userID = user.id;

    res.send('Account Created!');
  }
);

router.get('/signin', (req, res) => {
  res.send(signinView());
});

router.post(
  '/signin',
  [validateSignInEmail, validateSignInPassword],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
    }

    const user = await usersRepo.getOneBy({ email: req.body.email });
    if (!user) {
      return res.send('Email not found');
    }

    req.session.userID = user.id;
    res.send('You are signed in');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

module.exports = router;
