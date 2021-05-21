exports.up = function (knex) {
  return knex.schema.createTable('Show', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('description');
    table.string('genres').notNullable();
    table.string('day').notNullable();
    table.integer('hour').notNullable(); 
    table.decimal('duration').notNullable();
  })
  .createTable('Playlist', (table) => {
    table.increments('id');
    table.string('date').notNullable();
    table.integer('showId').references("Show.id").onDelete("CASCADE");
  })
  .createTable('Song', (table) => {
    table.increments('id');
    table.string('time');
    table.string('title').notNullable();
    table.string('albumArt').notNullable();
    table.string('album').notNullable();
    table.integer('playlistId').references("Playlist.id").onDelete("CASCADE");
  })
  .createTable('DJs', (table) => {
    table.increments('id');
    table.string('name');
    table.string('email').unique().notNullable();
    table.boolean('exec').notNullable();
  })
  .createTable('ShowDJs', (table) => {
    table.integer("showId");
    table.integer("djId");
    table.foreign("showId").references("Show.id");
    table.foreign("djId").references("DJs.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Show').dropTableIfExists('Playlist').dropTableIfExists('Song').dropTableIfExists('DJs').dropTableIfExists('ShowDJs');
};