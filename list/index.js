#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

// Method #2
// const lstat = util.promisify(fs.lstat);

// Method #3
// const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    throw new Error(err.message);
  }

  for (let filename of filenames) {
    try {
      const stats = await lstat(filename);

      console.log(filename, stats.isFile());
    } catch (error) {
      console.log(error);
    }
  }
});

// Method #1
const lstat = (filename) => {
  return new Promise((resolve, reject) => {
    fs.lstat(filename, (err, stats) => {
      if (err) {
        reject(err);
      }

      resolve(stats);
    });
  });
};
