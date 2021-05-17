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
  

  let djMap = [];
  let djRecord= [];
  shows.forEach((f) => {
    f.DJs.forEach((d) => { 
      let id;
      if (!djRecord.includes(d)){
        id = djRecord.length;
        djRecord.push(d);
      }
      else {
        for(i=0; i<djRecord.length; i++){
          if (d === djRecord[i]){
            id = i;
          }
        }
      }
      djMap.push({'show_id': f.id, 'DJs_id': id})
    })
  });
  console.log(djMap);
  console.log(djRecord)
  knex("ShowDJs").del();
  knex.batchInsert("ShowDJs", djMap, 100);

  const contentsDJs = fs.readFileSync('./data/DJs.json');
  const djs = JSON.parse(contentsDJs);
  djsUpdated = djs.map((d) =>{
    let id;
    for(i=0; i<djRecord.length; i++){
          if (d.name === djRecord[i]){
            id = i;
          }
        }
    return {name: d.name, email:d.email, id:id}
  })
  console.log(djsUpdated)
  knex("DJs").del();
  knex.batchInsert("DJs", djsUpdated, 100);
  
};