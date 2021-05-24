const fs = require('fs');

exports.seed = async function (knex) {
  
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
  await knex("Show").del();
  await knex.batchInsert("Show", showData, 100);

  const djContents = fs.readFileSync("./data/djs.json");
  const djData = JSON.parse(djContents);
  await knex("DJs").del();
  await knex.batchInsert("DJs", djData, 100);

  const djMap = [];
  shows.forEach((show) => {
    show.DJs.forEach((id) => {
      djMap.push({showId: show.id, djId: id});
    });
  });
  await knex("ShowDJs").del();
  await knex.batchInsert("ShowDJs", djMap, 100);
};