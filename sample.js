var knex = require('knex')({client:'sqlite3',connection:{filename: 'data.sqlite3'}});
var bookshelf = require('bookshelf')(knex);
var Language = bookshelf.Model.extend({tableName: 'languages', idAttribute: 'languageid'});
var Post = bookshelf.Model.extend({tableName: 'posts', idAttribute: 'postid', Language: function(){return this.belongsTo(Language,'languageid');}});

Post.where({postid: 3}).fetch({withRelated:['Language']}).then(function(p) {console.log(p.toJSON());});
// Outputs:
// { postid: 3,
//   languageid: 1,
//   text: 'something else written',
//   Language: { languageid: 1, name: 'english' } }

Post.where({postid: 3}).fetch({withRelated:['Language']}).then(function(p) {console.log(p.related('Language').toJSON());});
// Outputs: 
// { languageid: 1, name: 'english' }
