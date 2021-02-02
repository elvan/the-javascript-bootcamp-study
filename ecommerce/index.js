const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const usersRepo = require('./repositories/users.repository');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['tcuF8l8Isyg7zbHS'],
  })
);

const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <div>
      Your ID is: ${req.session.userID}
      <form method="POST">
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="passwordConfirmation" type="password" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
