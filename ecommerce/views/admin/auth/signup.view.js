module.exports = ({ req }) => {
  return `
    <div>
      Your ID is: ${req.session.userID}
      <form method="POST">
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="passwordConfirmation" type="password" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `;
};
