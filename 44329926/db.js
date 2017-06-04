exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', function (table) {
        //this creates an id column as auto incremented primary key
        table.increments();
        table.string('description', 45).notNullable();
    })
    .createTable('users', function (table) {
        table.increments();
        table.string('name', 60);
        table.string('password', 45);
        table.integer('role_id').unsigned();
        table.foreign('role_id').references('roles.id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users').dropTable('roles');
};
