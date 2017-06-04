module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    debug: false
  },

  test: {
    client: 'mysql',
    connection: {
      host: '172.18.0.2',
      user: 'root',
      password: '',
      database: 'staging_db',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'usr',
      password: process.env.DB_PWD || '',
      database: process.env.DB_NAME || 'db',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
