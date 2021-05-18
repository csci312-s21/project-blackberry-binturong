exports.up = function (knex, Promise) {
  return knex.schema.createTable('Show', (table) => {
    table.integer('id');
    table.string('title');
    table.string('DJs');
    table.text('description');
    table.specificType('genres', 'text ARRAY').notNullable();
    table.string('day').notNullable();
    table.decimal('hour').notNullable(); 
    table.decimal('duration').notNullable();
  })
  .createTable('Playlist', (table) => {
    table.integer('id');
    table.string('date');
    table.integer('showId').references("Show.id").onDelete("CASCADE");
  })
  .createTable('Song', (table) => {
    table.integer('id');
    table.string('time');
    table.string('title');
    table.string('album_art');
    table.string('album');
    table.integer('playlistId').references("Playlist.id").onDelete("CASCADE");
  })
  .createTable('DJs', (table) => {
    table.string('name');
    table.string('email');
    table.integer('id');
    //table.integer('accntId').references("user.id").onDelete("CASCADE");
  })
  .createTable('ShowDJs', (table) => {
    table.integer("show_id");
    table.integer("DJs_id");
    table.foreign("show_id").references("Show.id");
    table.foreign("DJs_id").references("DJs.id");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('Show').dropTableIfExists('Playlist').dropTableIfExists('Song').dropTableIfExists('DJs').dropTableIfExists('ShowDJs');
};