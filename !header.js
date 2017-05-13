'use strict';

const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: 'data.sqlite3' },
    debug: true
});
const bookshelf = require('bookshelf')(knex);
const bcrypt = require('bcrypt-then');
bookshelf.plugin('registry');
