module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ecommerce Admin</title>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
};
