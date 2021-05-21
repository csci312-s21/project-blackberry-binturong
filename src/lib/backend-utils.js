import knexConfig from "../../knexfile";
import knexInitializer from "knex";


export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);



/**
 * Get the list of DJ names for a show.
 * 
 * @param {integer} showId 
 * @returns an array of DJ names for show with id showId
 */
export async function getDJNames(showId) {
  const djs = await knex.select("name")
    .from("ShowDJs")
    .join("DJs", "DJs.id", "ShowDJs.djId")
    .where({"showId": showId});
  const djNames = djs.map((dj) => dj.name);
  return djNames;
}

/**
 * Gets all the shows from the database
 * 
 * @returns an array of all shows
 */
export async function getAllShows() {
  const shows = await knex("Show").select();
  await Promise.all(
    shows.map(async (show) => {
      show.DJs = await getDJNames(show.id);
    })
  );
  shows.forEach((show) => show.genres = show.genres.split(","));
  return shows;
}

/**
 * Gets a single show from the database
 * 
 * @param {integer} showId 
 * @returns a show with id showId
 */
export async function getShow(showId) {
  const [show] = await knex("Show").where({id: showId}).select();
  if (show) {
    show.DJs = await getDJNames(show.id);
    show.genres = show.genres.split(",");
    return show;
  } else {
    return null;
  }
}

/**
 * Gets all playlists for a show from the database
 * 
 * @param {integer} showId 
 * @returns an array of playlists with showId showId
 */
export async function getShowPlaylists(showId) {
  const playlists = await knex("Playlist").where({showId: showId}).select();
  if (playlists) {
    return playlists;
  } else {
    return null;
  }
}

/**
 * Add a new playlist to the database
 *
 * @param {object} playlist
 * @returns the playlist with a new id attached
 */
export async function addPlaylist(playlist) {
  const inserted = await knex("Playlist").insert(playlist);
  return {...playlist, id: inserted[0]};
}
