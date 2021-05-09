exports.up = function (knex, Promise) {
  return knex.schema.createTable('Show', (table) => {
    table.increments('id');
    table.string('title');
    table.string('DJs');
    table.text('description');
    table.specificType('genres', 'text ARRAY').notNullable();
    table.string('day').notNullable();
    table.decimal('hour').notNullable(); 
    table.decimal('duration').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('Article');
};