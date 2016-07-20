'use strict';

    var knex = require('knex')({client: 'sqlite3',connection: {filename: 'data.sqlite3'}, debug: true});
    var bookshelf = require('bookshelf')(knex);

    var User = bookshelf.Model.extend({
      tableName: 'users',
    });

    (function() {
      User
        .where({name:'amy'})
        .save({email: 'amysnewemail@example.com'},{patch:true})
        .then(function(x) {
          console.log(x.toJSON());
        });
    })();
