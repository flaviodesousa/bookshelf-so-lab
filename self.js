var knex = require('knex')({client:'sqlite3',connection:{filename: 'data.sqlite3'}, debug: true});
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

knex.schema.createTable('users_users', (tbl) => {
    tbl.integer('user_id').references('users.id');
    tbl.integer('follower_id').references('users.id');
    tbl.unique(['user_id', 'follower_id']);
      // This b/c I read a few places that Bookshelf might require a composite key.
  });

knex.schema.createTable('users', (tbl) => {
    tbl.integer('id');
  });

const User = bookshelf.Model.extend({
  tableName: 'users',
  following: function() {
    return this.belongsToMany('User', 'users_users', 'follower_id', 'user_id');
  },
  followers: function() {
    return this.belongsToMany('User', 'users_users', 'user_id', 'follower_id');
  },
});
bookshelf.model('User', User);

var mockUser;
new User({id: 1}).fetch({withRelated: 'followers'}).then((x) => { mockUser = x; });

var anotherMockUser;
new User({id: 2}).fetch().then((x) => { anotherMockUser = x; });

    var saveUser = (data) => {
      return User.forge().save(data);
    };
    Promise.all([saveUser(mockUser), saveUser(anotherMockUser)]).
    then((results) => {
        console.log('a1')
        let usr1 = results[0];
        let usr2 = results[1];
        return usr2.followers().attach(usr1.id);
      }).
    then((usrWithFollower) => {
        console.log('a2')
        return usrWithFollower.fetch({
          withRelated: ['followers']
        });
      }).
    then((usr) => {
        console.log('a3')
        console.log(JSON.stringify(usr));
        console.log('followers: ', usr.get('followers'));
        done();
      }).
    catch((err) => { done(err); }).
    then((x) => { console.log(x);});
