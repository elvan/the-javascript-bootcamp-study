// @ts-nocheck

const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users.repository');
const signinView = require('../../views/admin/auth/signin.view');
const signupView = require('../../views/admin/auth/signup.view');
const {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} = require('./auth.validators');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupView({ req }));
});

router.post(
  '/signup',
  [validateEmail, validatePassword, validatePasswordConfirmation],
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
  [
    check('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Must be a valid email')
      .custom(async (email) => {
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
          throw new Error('Email not found');
        }
      }),
    check('password').trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    if (!user) {
      return res.send('Email not found');
    }

    const validPassword = await usersRepo.comparePasswords(
      user.password,
      password
    );

    if (!validPassword) {
      return res.send('Invalid password');
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
