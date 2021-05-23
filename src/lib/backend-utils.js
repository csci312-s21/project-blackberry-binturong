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
 * Gets all the playlists from the database
 * 
 * @returns an array of all playlists
 */
export async function getAllPlaylists() {
  const playlists = await knex("Playlist").select();
  return playlists;
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

/**
 * Update a playlist in the database
 *
 * @param {object} playlist
 * @returns a Boolean indicating success
 */
export async function updatePlaylist(playlist) {
  const success = await knex("Playlist").where({id: playlist.id}).update(playlist);
  return success;
}

/**
 * Gets all the songs from the database
 * 
 * @returns an array of all songs
 */
export async function getAllSongs() {
  const songs = await knex("Song").select();
  return songs;
}


/**
 * Add a new song to the database
 *
 * @param {object} song
 * @returns the song with a new id attached
 */
export async function addSong(song) {
  const inserted = await knex("Song").insert(song);
  return {...song, id: inserted[0]};
}


/**
 * Remove the song associated with the provided id from the database
 *
 * @param {number} id
 * @returns a Boolean indicating success
 */
export async function deleteSong(id) {
  const success = await knex("Song").where({id: id}).del();
  return success;
}

/**
 * Update a song in the database
 *
 * @param {object} song
 * @returns a Boolean indicating success
 */
export async function updateSong(song) {
  const success = await knex("Song").where({id: song.id}).update(song);
  return success;
}


/**
 * Verify whether an email is in the database
 * 
 * @param {string} email
 * @returns a boolean indicating whether email is in the database
 */
export async function verifyEmail(email) {
  const emails = await knex.select("email").from("DJs").where({email: email});
  return (emails.length > 0);
}
