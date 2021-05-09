const fs = require('fs');

exports.seed = function (knex, Promise) {
  const contents = fs.readFileSync('./data/shows.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex('Show')
    .del()
    .then(() => knex.batchInsert('Show', data, 100));
};