import knexConfig from '../../knexfile';
import knexInitializer from 'knex';

const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || 'development']
);

export async function getShows() {
  const rows = await knex("Show").select();
return rows;
}

export async function getShow(id) {
  const articles = await knex("Show").where({id:id}).select();
  if (articles.length !== 1) {
    return null;
  }
  else {
    return articles[0]
  }
}

export async function getDJs(id){
  const djs = await knex.select("name")
    .from("ShowDJs")
    .join("DJs", "DJs.id", "ShowDJs.DJs_id")
    .where({"show_id":id});
  const genreArr = genre.map((g) => g.genre);
  return genreArr;
}
