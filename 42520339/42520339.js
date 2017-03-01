'use strict';

// create table gods("id" integer not null primary key autoincrement, apikey text);

const God = require('./god.model');

var validate_key_secret = function validade_key_secret_fn(key, secret, callback) {
    console.log('validade_key_secret_fn');
    console.dir(God);
    console.log('--------------');

    God.where({apikey: key}).fetch().then(function validate_key_secret_then(result){
        if(result.attributes.apisecret === secret) {
            callback(results);
        } else {
            callback(false);
        }
    });
};

validate_key_secret('a', 'b', function validate_key_secret_callback(x) {
  console.log('returned:');
  console.dir(x);
});
