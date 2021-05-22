<<<<<<< HEAD
import djs from "../../data/djs.json";
import shows from "../../data/shows.json";
import playlists from "../../data/playlists.json";
import songs from "../../data/songs.json";


import {
  knex,
  getDJNames,
  getAllShows,
  getShow,
  getShowPlaylists,
  addPlaylist,
  getPlaylistSongs,
  addSong,
  deleteSong,
  updateSong,
  verifyEmail,
} from "./backend-utils.js";

describe("Tests of the database utility functions", () => {
  let sampleShow;


  beforeAll(async () => {
    sampleShow = shows[Math.floor(shows.length/2)];
    sampleShow.DJs = sampleShow.DJs.map((id) => djs.find((dj) => dj.id === id).name);
  });


  beforeEach(async () => {
=======
import djData from "../../data/djs.json";
import {
  knex,
  verifyEmail
} from "./backend-utils.js";

describe("Tests of the database utility functions", () => {
 
 beforeEach(async () => {
>>>>>>> bff7240a2229854e6405f4c2fd84fa9ea2d51fec
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

<<<<<<< HEAD
  test("getDJNames fetches the correct names for a show", async () => {
    const testDJNames = await getDJNames(sampleShow.id);
    expect(testDJNames.length).toBe(sampleShow.DJs.length);
    expect(testDJNames).toEqual(expect.arrayContaining(sampleShow.DJs));
  });

  test("getShow fetches the correct show", async () => {
    const show = await getShow(sampleShow.id);
    expect(show.title).toBe(sampleShow.title);
    expect(show.description).toBe(sampleShow.description);
    expect(show.genres).toEqual(expect.arrayContaining(sampleShow.genres));
    expect(show.day).toBe(sampleShow.day);
    expect(show.hour).toBe(sampleShow.hour);
    expect(show.duration).toBe(sampleShow.duration);
  });

  test("getShow fetches show with the correct DJs", async () =>{ 
    const show = await getShow(sampleShow.id);
    expect(show.DJs.length).toBe(sampleShow.DJs.length);
    expect(show.DJs).toEqual(expect.arrayContaining(sampleShow.DJs));

  });

  test("getShow returns null on bad id", async () => {
    const show = await getShow(-1);
    expect(show).toBeNull();
  });

  test("getAllShows fetches all shows", async () => {
    const fetchedShows = await getAllShows();
    expect(fetchedShows).toHaveLength(shows.length);
    const testShow = fetchedShows.find((show) => show.id === sampleShow.id);
    expect(testShow).toEqual(sampleShow);
    const properties = ["id", "title", "description", "hour", "day", "duration", "DJs", "genres"];
    properties.forEach((prop) => {expect(fetchedShows[0]).toHaveProperty(prop)});
  });

  test("getAllShows loads the correct DJs", async () => {
    const fetchedShows = await getAllShows();
    const testShow = fetchedShows.find((show) => show.id === sampleShow.id);

    expect(testShow.DJs.length).toBe(sampleShow.DJs.length);
    expect(testShow.DJs).toEqual(expect.arrayContaining(sampleShow.DJs));
  });

  test("getShowPlaylists loads the correct playlists", async () => {
    const testShow = await getShow(55);
    const expectedPlaylists = playlists.filter((playlist) => playlist.showId === 55);
    const fetchedPlaylists = await getShowPlaylists(testShow.id);
    expect(fetchedPlaylists).toHaveLength(expectedPlaylists.length);
    fetchedPlaylists.forEach((pl) => expect(pl.showId).toEqual(testShow.id));
  });

  test("addPlaylist returns a playlist with new id", async () => {
    const sample = {
      "date": "4-30-2021",
      "showId": 55
    };
    
    const playlist = await addPlaylist(sample);
    expect(playlist.date).toBe(sample.date);
    expect(playlist.showId).toBe(sample.showId);
    expect(playlist.id).toBeGreaterThanOrEqual(0);
  });

  test("getPlaylistSongs loads the correct songs", async () => {
    const testPlaylist = {
      "date": "4-29-2021",
      "id": 15,
      "showId": 56
    };
    
    const expectedSongs = songs.filter((song) => song.playlistId === testPlaylist.id);
    const fetchedSongs = await getPlaylistSongs(testPlaylist.id);
    expect(fetchedSongs).toHaveLength(expectedSongs.length);
    fetchedSongs.forEach((song) => expect(song.playlistId).toEqual(testPlaylist.id));
  });

  test("addSong returns a song with new id", async () => {
    const sample = {
      "title": "Never Gonna Give You Up",
      "artist": "Rick Astley",
      "album": "Whenever You Need Somebody",
      "albumArt": "",
      "time": "4:00 pm",
      "playlistId": 12
    };
    
    const song = await addSong(sample);
    expect(song.title).toBe(sample.title);
    expect(song.artist).toBe(sample.artist);
    expect(song.album).toBe(sample.album);
    expect(song.albumArt).toBe(sample.albumArt);
    expect(song.id).toBeGreaterThanOrEqual(0);
    expect(song.time).toBe(sample.time);
    expect(song.playlistId).toBe(sample.playlistId);
  });

  test("deleteSong deletes song", async () => {
    const sample = songs[0];

    const success = await deleteSong(sample.id);
    expect(success).toBeTruthy();

    const rows = await knex("Song").where({ id: sample.id }).select();
    expect(rows).toHaveLength(0);
  });

  test("deleteSong on missing song returns 0", async () => {
    const success = await deleteSong(-1);
    expect(success).toBeFalsy();
  });

  test("updateSong updates the song", async () => {
    const sample = { ...songs[0], title: "New Title" };
    const success = await updateSong(sample);
    expect(success).toBeTruthy();
    const rows = await knex("Song").where({ id: sample.id }).select();

    const song = rows[0];
    expect(song.title).toBe(song.title);
  });

  test("updateSong returns 0 if the id doesn't exist", async () => {
    const sample = { id: -1, title: "Bad Song" };
    const success = await updateSong(sample);
    expect(success).toBeFalsy();
  });

  test("Verifies correct email", async () => {
    const sampleDJ = djs[Math.floor(djData.length / 2)];
=======
  test("Verifies correct email", async () => {
    const sampleDJ = djData[Math.floor(djData.length / 2)];
>>>>>>> bff7240a2229854e6405f4c2fd84fa9ea2d51fec
    const result = await verifyEmail(sampleDJ.email);
    expect(result).toBeTruthy();
  });

  test("rejects incorrect email", async () => {
    const result = await verifyEmail("sampleperson@middlebury.edu");
    expect(result).toBeFalsy();
  });
<<<<<<< HEAD
=======
  
>>>>>>> bff7240a2229854e6405f4c2fd84fa9ea2d51fec
});