'use strict';

const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: 'data.sqlite3' },
    debug: true
});
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

knex.schema.dropTableIfExists('sample');
knex.schema.createTableIfNotExists('sample', function(table) {
    table.increments('id')
        .primary();
    table.string('column1');
    table.string('column2');
});

const User = bookshelf.Model.extend({
    tableName: 'sample'
});
bookshelf.model('User', User);

let u1, u2;

new User().save({ column1: 'value1-1' }).then(v => { u1 = v });
new User().save({ column1: 'value2-1', column2: 'value2-2' }).then(v => { u2 = v });

u2.set('column1','value2-1-2');

u2.save({}, {patch:true}); // fails
u2.save(null, {patch:true}); // also fails
u2.save().then(x=>console.dir(x)); // passes!
