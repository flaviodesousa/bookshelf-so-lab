'use strict';

var _ = require('lodash');
var knex = require('knex')({client:'sqlite3',connection:{filename: 'data.sqlite3'}, debug: true});
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('saving', this._assertEmailUnique);
  },
  _assertEmailUnique: function(model, attributes, options) {
    if (this.hasChanged('email')) {
      return this
        .query('where', 'email', this.get('email'))
        .fetch(_.pick(options||{}, 'transacting'))
        .then(function (existing) {
            console.log('>> existing');
            console.dir(existing);
            console.log('<< existing');
          if (existing) {
            return existing;
          }
          throw new Error('duplicated email');
        });
    }
  }
});

(function () {
  new User({name: 'amy'})
        .fetch()
        .tap(function (x) {
            console.log(x.toJSON());
        })
        .then(function (x) {
            return x
            .set('email','anne@example.com')
            .save();
        })
        .then(function (x) {
            console.log(x.toJSON());
        })
        .catch(function (e) {
            console.dir(e);
        });
    })();
