const fs = require('fs');

exports.seed = async function (knex) {
  
  const songContents = fs.readFileSync('./data/songs.json');
  const songs = JSON.parse(songContents);
  // Deletes ALL existing entries
  return knex("Song").del()
    .then(function () {
      // Inserts seed entries
      return knex.batchInsert("Song", songs, 100);
    });
};
