'use strict';

var _ = require('lodash');
var knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: 'data.sqlite3' },
  debug: true });
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('saving', this._assertEmailUnique);
  },
  _assertEmailUnique: function(model, attributes, options) {
    if (this.hasChanged('email')) {
      return User
        .query('where', 'email', this.get('email'))
        .fetch(_.pick(options || {}, 'transacting'))
        .then(function(existing) {
          if (existing) {
            throw new Error('Duplicated email: User id #' + existing.id);
          }
        });
    }
  }
});

(function() {
  new User({name: 'amy'})
        .fetch()
        .tap(function(x) {
          console.log(x.toJSON());
        })
        .then(function(x) {
          return x
            .set('email','anne@example.com')
            .save();
        })
        .then(function(x) {
          console.log(x.toJSON());
        })
        .catch(function(e) {
          console.dir(e);
        });
})();
