const fs = require('fs');

exports.seed = async function (knex) {

  await knex("Playlist").del();
  await knex("Song").del();
  await knex("ShowDJs").del();
  await knex("Show").del();
  await knex("DJs").del(); 

  const contentsShow = fs.readFileSync('./data/shows.json');
  const shows = JSON.parse(contentsShow);

  const showData = shows.map(
    (show) => ({
      title: show.title, 
      description: show.description, 
      day: show.day,
      hour: show.hour,
      duration: show.duration,
      genres: show.genres.join(),
      id: show.id
    })
  );
  await knex.batchInsert("Show", showData, 100);

  const djContents = fs.readFileSync("./data/djs.json");
  const djData = JSON.parse(djContents);
  await knex.batchInsert("DJs", djData, 100);

  const djMap = [];
  shows.forEach((show) => {
    show.DJs.forEach((id) => {
      djMap.push({showId: show.id, djId: id});
    });
  });
  await knex.batchInsert("ShowDJs", djMap, 100);

  const playlists = fs.readFileSync("./data/playlists.json");
  const playlistData = JSON.parse(playlists);
  await knex.batchInsert("Playlist", playlistData, 100);

  const songs = fs.readFileSync("./data/songs.json");
  const songData = JSON.parse(songs);
  await knex.batchInsert("Song", songData, 100);
};