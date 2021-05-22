const fs = require('fs');

exports.seed = async function(knex) {
  const songs = fs.readFileSync("./data/songs.json");
  const songData = JSON.parse(songs);

  await knex("Song").del();
  await knex.batchInsert("Song", songData, 100);

  const playlists = fs.readFileSync("./data/playlists.json");
  const playlistData = JSON.parse(playlists);

  await knex("Playlist").del();
  await knex.batchInsert("Playlist", playlistData, 100);
};
