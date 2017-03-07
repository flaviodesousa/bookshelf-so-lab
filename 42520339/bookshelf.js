'use strict'
const debug = require('debug')('42520339:bookshelf');
var knex = require('knex')(require('./knexfile'));
knex.debug(true);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;

debug('knex=%O', knex);
