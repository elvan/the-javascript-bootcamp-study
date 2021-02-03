const layout = require('../admin.layout');

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return '';
  }
};

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <p>
            <input name="email" type="text" placeholder="email" />
            ${getError(errors, 'email')}
          </p>
          <p>
            <input name="password" type="password" placeholder="password" />
            ${getError(errors, 'password')}
          </p>
          <button>Sign In</button>
        </form>
      </div>
    `,
  });
};
