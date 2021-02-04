// @ts-nocheck

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();
const port = 3000;

const authRouter = require('./routes/admin/auth.routes');
const productsRouter = require('./routes/admin/product.routes');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['tcuF8l8Isyg7zbHS'],
  })
);

app.use(authRouter);
app.use(productsRouter);

app.get('/', (req, res) => {
  res.send(`<h4>Your ID is: ${req.session.userID}</h4>`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
