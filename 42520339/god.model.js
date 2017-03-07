const debug = require('debug')('42520339:model');
var bookshelf = require('./bookshelf');

debug("bookshelf.knex=%O", bookshelf.knex);

var God = bookshelf.Model.extend({
    tableName: 'gods'
});

new God().fetchAll().then(function fetchAllThen(x) {
    debug('x=');
    debug("x=%O", x)
    debug('--------------');
});

module.exports = bookshelf.model('God', God);
