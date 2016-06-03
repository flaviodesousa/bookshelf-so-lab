var knex = require('knex')({client:'sqlite3',connection:{filename: 'data.sqlite3'},debug:true});
var bookshelf = require('bookshelf')(knex);
knex.schema.createTable("roles", function(table) {
        table.increments("id").primary();
        table.string("name").notNullable();
    }).then(function() { console.log('created'); });

var Role = bookshelf.Model.extend({tableName: 'roles'});
var Roles = bookshelf.Collection.extend({
  model: Role
});

bookshelf.transaction(function(t) {
  return Role
    .where('name', '=', 'Staff')
    .destroy({transacting: t})
    .then(function() {
      var roles = Roles.forge([{name: 'Staff'}, {name: 'Guest'}]);
      return roles
        .invokeThen('save', null, {transacting: t});
    })
    .catch(function(e) {
      console.log('e='); console.dir(e);
    });
}).
  then(function(t) { console.dir(t); console.log('finished'); }).
  catch(function(e){console.log('error');console.dir(e);});

////// Final answer

    var Roles = bookshelf.Collection.extend({
      model: Role
    });

    bookshelf.transaction(function(t) {
      return Role
        .where('name', '=', 'Staff')
        .destroy({transacting: t})
        .then(function() {
          var roles = Roles.forge([{name: 'Staff'}, {name: 'Guest'}]);
          return roles
            .invokeThen('save', null, {transacting: t});
        });
    });

