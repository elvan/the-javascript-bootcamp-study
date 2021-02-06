const layout = require('../admin.layout');
const getError = require('../../error.helper');

module.exports = ({ product, errors }) => {
  return layout({
    content: `
      <form method="POST">
        <div>
          <input class="input" name="title" value="${product.title}">
          ${getError(errors, 'title')}
        </div>
        <div>
          <input class="input" name="price" value="${product.price}">
          ${getError(errors, 'price')}
        </div>
        <div>
          <input type="file" name="image" />
        </div>
        <br />
        <button>Save</button>
      </form>
    `,
  });
};
