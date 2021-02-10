// @ts-nocheck

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const excludeDirs = ['node_modules'];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTest() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`--- ${file.shortName} ---`));

      const beforeEaches = [];

      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = (desc, fn) => {
        beforeEaches.forEach(func => func());

        try {
          fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (error) {
          const message = error.message.replace(/\n/g, '\n\t');
          console.log(chalk.red(`\tX - ${desc}`));
          console.log(chalk.red('\t>>', message));
        }
      };

      try {
        require(file.name);
      } catch (error) {
        console.log(chalk.red(error));
      }

    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stats.isDirectory() && !excludeDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(...childFiles.map(f => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
