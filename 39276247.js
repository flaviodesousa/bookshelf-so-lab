/**
 * Created by flavio.de.sousa on 9/2/16.
 */

'use strict';

var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: 'data.sqlite3' },
    debug: true
});
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');


var User = bookshelf.Model.extend({
    tableName: 'users',
    skills: function () {
        return this.hasMany('SkillUser')
    }
});
bookshelf.model('User', User);


var SkillUser = bookshelf.Model.extend({
    tableName: 'skills_users',
    user: function () {
        return this.belongsTo('User');
    },
    ratings: function () {
        return this.hasMany('Rating', 'rateable_id');
    }
});
bookshelf.model('SkillUser', SkillUser);


var Application = bookshelf.Model.extend({
    tableName: 'applications',
    user: function () {
        return this.belongsTo('User', 'applicant_id');
    },
    applicant_ratings: function () {
        return this.belongsTo('User', 'applicant_id')
            .hasMany('Rating')
            .through('SkillUser','rateable_id');
    }
});
bookshelf.model('Application', Application);

var Rating = bookshelf.Model.extend({
    tableName: 'ratings'
});
bookshelf.model('Rating', Rating);

console.log('--------------------------');
var result;
Application.
fetchAll({withRelated: [
    'user','user.skills','user.skills.ratings']}).
then(function (x) {
    result = x;
});

console.log('--------------------------');
Application.fetchAll({withRelated:['applicant_ratings']}).
then(function (x) {
    result = x;
});