// @ts-nocheck

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

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
          console.log(chalk.green(`OK - ${desc}`));
        } catch (error) {
          console.log(chalk.red(`X - ${desc}`));
          console.log(chalk.red('>>', error.message));
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
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(...childFiles.map(f => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
