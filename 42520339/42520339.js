'use strict';

// create table gods("id" integer not null primary key autoincrement, apikey text);

const debug = require('debug')('42520339');
const God = require('./god.model');

var validate_key_secret = function validade_key_secret_fn(key, secret, callback) {
    debug('validade_key_secret_fn');
    debug("God=%O", God);
    debug('--------------');

    God.where({apikey: key}).fetch().then(function validate_key_secret_then(result){
        if(result.attributes.apisecret === secret) {
            callback(results);
        } else {
            callback(false);
        }
    });
};

validate_key_secret('a', 'b', function validate_key_secret_callback(x) {
  debug('returned:');
  debug("x=%O", x);
});
