const fs = require('fs');
const crypto = require('crypto');

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

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomID();

    const records = await this.getAll();
    records.push(attrs);

    await this.writeAll(records);
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

  randomID() {
    return crypto.randomBytes(4).toString('hex');
  }
}

const test = async () => {
  const repo = new UsersRepository('data/users.json');

  // await repo.create({ email: 'test@example.com', password: 'pswd1234' });
  // const users = await repo.getAll();
  // console.log(users);

  await repo.update('a8d4864a', { password: 'admin123' });
};

test();
