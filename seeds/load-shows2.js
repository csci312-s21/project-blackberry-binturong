const fs = require('fs');

exports.seed = function (knex, Promise) {
  const contentsShow = fs.readFileSync('./data/shows.json');
  const shows = JSON.parse(contentsShow);
  knex("Show").del();
  knex.batchInsert("Show", shows, 100);

  const contentsPlaylist = fs.readFileSync('./data/playlists.json');
  const playlists = JSON.parse(contentsPlaylist);
  knex("Playlists").del();
  knex.batchInsert("Playlists", playlists, 100);
  
  const contentsDJs = fs.readFileSync('./data/DJs.json');
  const djs = JSON.parse(contentsDJs);
  knex("DJs").del();
  knex.batchInsert("DJs", djs, 100);
  
};