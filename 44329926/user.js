let bookshelf = require('./database');

var Role = bookshelf.Model.extend({
	tableName: 'roles'
});

var User = bookshelf.Model.extend({
    tableName: 'users',
    role: function() {
        return this.hasOne(Role);
    }
});

module.exports = bookshelf.model('user', User);
