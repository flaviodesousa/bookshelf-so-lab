var bookshelf = require('./bookshelf');

console.log('god.model');
console.dir(bookshelf.knex);
console.log('--------------');

var God = bookshelf.Model.extend({
    tableName: 'gods'
});

God.fetchAll().then((x) => {
    console.log('x=');
    console.dir(x)
    console.log('--------------');
});

module.exports = bookshelf.model('God', God);
