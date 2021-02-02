// @ts-nocheck

const express = require('express');
const router = express.Router();

const usersRepo = require('../../repositories/users.repository');
const signinView = require('../../views/admin/auth/signin.view');
const signupView = require('../../views/admin/auth/signup.view');

router.get('/signup', (req, res) => {
  res.send(signupView({ req: req }));
});

router.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email: email });

  if (existingUser) {
    return res.send('Email in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Passwords must match');
  }

  const user = await usersRepo.create({ email: email, password: password });

  req.session.userID = user.id;

  res.send('Account Created!');
});

router.get('/signin', (req, res) => {
  res.send(signinView());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email: email });

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
});

router.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

module.exports = router;
