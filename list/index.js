const fs = require('fs');

fs.readdir('.', (err, filenames) => {
  if (err) {
    throw new Error(err);
  }

  console.log(filenames);
});
