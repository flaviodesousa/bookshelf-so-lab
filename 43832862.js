'use strict';

const knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: 'data.sqlite3' },
    debug: true
});
const bookshelf = require('bookshelf')(knex);
const bcrypt = require('bcrypt-then');
bookshelf.plugin('registry');
//--------------------------------------------------------
Promise.all([
  knex.schema.createTable('user', table => {
    table.increments('id');
    table.string('username');
    table.string('password');
    table.unique('username');
  }),
  knex.schema.createTable('identity', table => {
    table.increments('id');
    table.string('type');
    table.string('value');
  }),
  knex.schema.createTable('identity_user', table => {
    table.integer('user_id').references('user.id');
    table.integer('identity_id').references('identity.id');
    table.unique(['user_id', 'identity_id']);
  })
]);
//--------------------------------------------------------------------------------

const Identity = bookshelf.model('Identity', {
  tableName: 'identity',

    user() {
      return this.belongsToMany('User');
    }
});

const User = bookshelf.model('User', {
  tableName: 'user',

  initialize() {
    this.on('saving', model => {
      if (model.hasChanged('username')) {
        return model.set('username', String(model.attributes.username).toLowerCase());
      }
    });
    this.on('saving', model => {
      if (model.hasChanged('password')) {
        return bcrypt.hash(model.attributes.password, 10)
          .then(hash => model.set('password', hash));
      }
    });
  },

    identities() {
      return this.belongsToMany('Identity');
    }
});
//-----------------------------------------------------------
function create(username, email, password) {
    return bookshelf.transaction((t) => {
        return new User({ username, password } )
          .save(null, { transacting: t })
          .then(user => new Identity({ type: 'email', value: email })
            .save(null, { transacting: t })
            .then(identity => user.identities()
              .attach(identity.id, { transacting: t })))
          .then(() => console.log('created'));
      })
      .catch(err => {
        console.log('errr');
        console.dir(err);
      });
}
