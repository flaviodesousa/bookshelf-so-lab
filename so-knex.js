'use strict';
var seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('accounts').del(),
    knex('users').insert({
      userId: '1231231',
      email: 'kel@test.com'
    }).then(function(result) {
      console.dir(result);
      console.log('---');
      knex('accounts').insert({
        accountId: '0',
        userId: result[0].userId
      });
    })
  );
};

knex('users').insert({
  userId: '1231231',
  email: 'kel@test.com'
}).then(function(result) {
  console.dir(result);
  console.log('---');
  return knex('accounts').insert({
    accountId: '0',
    userId: result[0].userId
  });
});
