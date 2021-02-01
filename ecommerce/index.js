const express = require('express');
const app = express();
const port = 3000;

const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', (data) => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};

      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="password_confirmation" type="password" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/', bodyParser, (req, res) => {
  console.log(req.body);
  res.send('Form submitted!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
