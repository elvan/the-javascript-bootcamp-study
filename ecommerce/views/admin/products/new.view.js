const layout = require('../admin.layout');
const getError = require('../../error.helper');

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="POST" enctype="multipart/form-data">
      <div>
        <input name="title" placeholder="Title" />
        ${getError(errors, 'title')}
      </div>
      <div>
        <input name="price" placeholder="Price" />
        ${getError(errors, 'price')}
      </div>
      <div>
        <input name="image" type="file" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
    `,
  });
};
