const BaseRepository = require('./base.repository');

class CartsRepository extends BaseRepository {
}

module.exports = new CartsRepository('./data/carts.json');
