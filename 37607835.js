'use strict';

var knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: 'data.sqlite3' }
});
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

knex.schema.createTable('users', function(table) {
  table.increments('id').primary();
  table.string('name');
}).then(function() {
  return knex.schema.createTable('courses', function(table) {
    table.increments('id').primary();
    table.string('name');
  });
}).then(function() {
  return knex.schema.createTable('users_courses', function(table) {
    table.integer('user_id').references('users.id');
    table.integer('course_id').references('courses.id');
  });
});

var User = bookshelf.Model.extend({
  tableName: 'users',
  courses: function() {
    return this.belongsToMany('Course', 'users_courses');
  }
});
bookshelf.model('User', User);

var Course = bookshelf.Model.extend({
  tableName: 'courses',
  users: function() {
    return this.belongsToMany('User', 'users_courses');
  }
});
bookshelf.model('Course', Course);

new User().save({name: 'Ana'});
new User().save({name: 'Job'});
new Course().save({name: 'Englisch'});

User.fetchAll({withRelated: 'courses'}).then(function(x) { console.log(x.toJSON()); });

new User({name: 'Ana'}).save().then(function(u) {return new Course({name: 'english'}).save().then(function(c) {c.users().attach(u);});});
new User({name: 'Mia'}).save().then(function(u) {return new Course({name: 'english'}).fetch().then(function(c) {c.users().attach(u);});});
new User({name: 'Mia'}).fetch().then(function(u) {return new Course({name: 'german'}).save().then(function(c) {c.users().attach(u);});});
