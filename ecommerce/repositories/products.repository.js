const BaseRepository = require('./base.repository');

class ProductsRepository extends BaseRepository {}

module.exports = new ProductsRepository('./data/products.json');
