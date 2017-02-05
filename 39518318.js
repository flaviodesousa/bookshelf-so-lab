'use strict';

const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: 'data.sqlite3' },
    debug: true });
const bookshelf = require('bookshelf')(knex);
Promise = require('bluebird');

Promise.all([
    () => {
        return knex.schema.createTableIfNotExists('customers', function(t) {
            t.increments('id').primary();
            t.string('emailAddress').notNullable().unique();
            t.timestamps(true, true);
        });
    },
    () => {
        return knex.schema.createTableIfNotExists('contacts', function(t) {
            t.increments('id').primary();
            t.string('value').notNullable();
            t.integer('contact_type_id').references('contact_types.id');
            t.string('contactable_type').notNullable();
            t.integer('contactable_id').notNullable();
        });
    },
    function() {
        knex.schema.createTableIfNotExists('contact_types', function(t) {
            t.increments('id').primary();
            t.string('value').notNullable();
        });
    },
]).then(function() {
    console.log('done');
}).catch(function(e) {
    console.error(e);
});
