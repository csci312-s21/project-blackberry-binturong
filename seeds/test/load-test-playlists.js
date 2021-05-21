const fs = require('fs');

exports.seed = async function (knex) {
  
  const playlistContents = fs.readFileSync('./data/playlists.json');
  const playlists = JSON.parse(playlistContents);
  // Deletes ALL existing entries
  return knex('Playlist').del()
    .then(function () {
      // Inserts seed entries
      return knex.batchInsert("Playlist", playlists, 100);
    });
};
