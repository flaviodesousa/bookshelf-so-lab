var knex = require('knex')({ 
  client: 'sqlite3',
  connection: { filename: 'data.sqlite3' },
  debug: true })
var bookshelf = require('bookshelf')(knex)
	bookshelf.plugin('registry')

const ongoingClasses = true;
var r;
knex('users').
      join('signed_in', 'signed_in.studentId', '=', 'users.id').
      where('signed_in.signedIn', false).
      select(['users.*', 'signed_in.*']).
      then(function(r) {console.log(r);});

var absentUsers = function(field) {
  // returns all users who did not sign in during a specific time
  if (ongoingClasses) {
    return knex('users').
    whereExists(function() {
      	this
      	.select('*').from('signed_in')
      	.where('signed_in.studentid', 'users.id')
      	.where('signed_in.signedin', false)}).increment(field);
  }
}
r = absentUsers('absent');
//r.then(a => console.log(a));