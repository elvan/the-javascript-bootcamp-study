const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

const BaseRepository = require('./base.repository');

class UsersRepository extends BaseRepository {
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

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split('.');
    const buffer = await scrypt(supplied, salt, 64);

    return hashed === buffer.toString('hex');
  }
}

module.exports = new UsersRepository('./data/users.json');
