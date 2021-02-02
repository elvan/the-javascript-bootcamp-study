const layout = require('../admin.layout');

module.exports = ({ req }) => {
  return layout({
    content: `
      <div>
        <h4>Your ID is: ${req.session.userID}</h4>
        <form method="POST">
          <input name="email" type="text" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <input name="passwordConfirmation" type="password" placeholder="password confirmation" />
          <button>Sign Up</button>
        </form>
      </div>
    `,
  });
};
