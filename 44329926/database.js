var config      = require('./knexfile');  
var env         = process.env.NODE_ENV || 'development';  
var knex        = require('knex')(config[env]);

knex.migrate.latest([config]);

let bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations

// Export bookshelf for use elsewhere
module.exports = bookshelf;
