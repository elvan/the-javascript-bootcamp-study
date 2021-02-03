const layout = require('../admin.layout');

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return '';
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
      <div>
        <h4>Your ID is: ${req.session.userID}</h4>
        <form method="POST">
          <p>
            <input name="email" type="text" placeholder="email" />
            ${getError(errors, 'email')}
          </p>
          <p>
            <input name="password" type="password" placeholder="password" />
            ${getError(errors, 'password')}
          </p>
          <p>
            <input name="passwordConfirmation" type="password" placeholder="password confirmation" />
            ${getError(errors, 'passwordConfirmation')}
          </p>
          <button>Sign Up</button>
        </form>
      </div>
    `,
  });
};
