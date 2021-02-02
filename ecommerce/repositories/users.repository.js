const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getOne(id) {
    const records = await this.getAll();

    return records.find((record) => record.id === id);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomID();

    const salt = crypto.randomBytes(8).toString('hex');
    const buffer = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buffer.toString('hex')}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id != id);
    await this.writeAll(filteredRecords);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split('.');
    const buffer = await scrypt(supplied, salt, 64);

    return hashed === buffer.toString('hex');
  }

  randomID() {
    return crypto.randomBytes(4).toString('hex');
  }
}

module.exports = new UsersRepository('./data/users.json');
