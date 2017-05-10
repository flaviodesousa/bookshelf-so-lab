'use strict';

const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: 'data.sqlite3' },
    debug: true
});
const bookshelf = require('bookshelf')(knex);
const bcrypt = require('bcrypt-then');
bookshelf.plugin('registry');
//--------------------------------------------------------
Promise.all([
  knex.schema.createTable('auth_user', table => {
    table.increments('id');
    table.string('email');
    table.timestamps();
  }),
  knex.schema.createTable('auth_user_auth_user', table => {
    table.integer('auth_user_from_id').references('auth_user.id');
    table.integer('auth_user_to_id').references('auth_user.id');
    table.string('random_data');
    table.timestamps();
    table.unique(['user_id', 'identity_id']);
  })
]);
//--------------------------------------------------------------------------------
var AuthUserAuthUser = bookshelf.Model.extend({
    tableName: 'auth_user_auth_user',
    hasTimestamps: true,
});

var AuthUser = bookshelf.Model.extend({
    tableName: 'auth_user',
    hasTimestamps: true,
    heroes: function() {
        var _this = this;
        return this.heroesFrom().query(qb => {
            qb.union(function() {
                 return _this.heroesTo().query();
            });
        });
    },
    heroesFrom: function() {
        return this.hasMany(AuthUser).through(AuthUserAuthUser, 'id', 'auth_user_from_id', 'auth_user_to_id', 'id').query(qb => {
            qb.select('auth_user.id', 'auth_user.email').where({auth_user_auth_user_type_id: '1'});
        });
    },
    heroesTo: function() {
        return this.hasMany(AuthUser).through(AuthUserAuthUser, 'id', 'auth_user_to_id', 'auth_user_from_id', 'id').query(qb => {
            qb.select('auth_user.id', 'auth_user.email').where({auth_user_auth_user_type_id: '1'});
        });
    }
});
