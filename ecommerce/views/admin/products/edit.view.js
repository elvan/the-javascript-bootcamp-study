const layout = require('../admin.layout');

module.exports = ({ product }) => {
  return layout({
    content: `
      <form method="POST">
        <div>
          <input class="input" name="title" value="${product.title}">
        </div>
        <div>
          <input class="input" name="price" value="${product.price}">
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
