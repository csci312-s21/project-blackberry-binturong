exports.up = function (knex, Promise) {
  return knex.schema.createTable('Show', (table) => {
    table.increments('id');
    table.string('title');
    table.string('DJs');
    table.string('description');
    table.array('genres');
    table.string('time.day')
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('Article');
};