/**
 * Created by flavio.de.sousa on 2/23/16.
 */
var knex = require('knex')({client:'sqlite3',connection:{filename: 'data.sqlite3'}});
var bookshelf = require('bookshelf')(knex);
var up = function(knex, Promise) {
    return knex.schema.createTable("backfire", function(table) {
        table.increments("id").primary();
        table.string("response").notNullable();
        table.string("created_by").notNullable();
        table.timestamps();
    }).then(function(){
        return knex.schema.createTable("backfireTrigger", function(table) {
            table.increments("id").primary();
            table.string("trigger").notNullable();
            table.integer("backfire_id").unsigned().notNullable().references("id").inTable("backfire");
            table.string("created_by").notNullable();
            table.timestamps();
        });
    });
};

up(knex);

var Backfire = bookshelf.Model.extend({
    tableName: 'backfire',
    backfireTriggers: function() {
        return this.hasMany(BackfireTrigger);
    }
});

var BackfireTrigger = bookshelf.Model.extend({
    tableName: 'backfireTrigger',
    backfire: function() {
        return this.belongsTo(Backfire);
    }
});

var bf1, bf2;
new Backfire({response: 'twist', created_by: 'twister'}).
    save().
    then(function(bf) {
        bf1 = bf.id;
        return new Backfire({response: 'shout', created_by: 'shouter'}).
            save();
    }).
    then(function(bf) {
        bf2 = bf.id;
        return new BackfireTrigger({trigger: 'death', backfire_id: bf1, created_by: 'dead'}).
            save();
    }).
    then(function() {
        return new BackfireTrigger({trigger: 'birth', backfire_id: bf2, created_by: 'mother'}).
            save();
    }).
    then(function() {
        return new BackfireTrigger({trigger: 'fall', backfire_id: bf2, created_by: 'faller'}).
            save();
    }).
    then(function() {
        return new BackfireTrigger({trigger: 'attack', backfire_id: bf2, created_by: 'attacker'}).
            save();
    }).
    then(function() {
        return BackfireTrigger.
            fetchAll({withRelated: ['backfire']}).
            then(function(result) {
                console.log(result.toJSON());
            });
    });

PROPERTY = bookshelf.Model.extend({
   tableName: 'PROPERTY',

   address: function() {
       return this.belongsTo(ADDRESS, 'address_id');
   }
});

ADDRESS = bookshelf.Model.extend({
   tableName: 'ADDRESS',

   property: function() {
       return this.hasOne(PROPERTY);
   }
});
