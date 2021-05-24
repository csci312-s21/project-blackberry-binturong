const fs = require("fs");

exports.seed = function(knex) {
  const djContents = fs.readFileSync("./data/djs.json");
  const data = JSON.parse(djContents);

  return knex("DJs")
    .del()
    .then(() => knex.batchInsert("DJs", data, 100));
};
