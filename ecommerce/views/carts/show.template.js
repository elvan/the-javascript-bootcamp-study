const layout = require('../layout.template');

module.exports = ({ items }) => {
  const renderedItems = items.map(item => {
    return `
      <div>
        ${item.product.title} - ${item.product.price}
      </div>
    `;
  });

  return layout({
    content: `
      <h1>Cart</h1>
      ${renderedItems}
    `
  });
};
