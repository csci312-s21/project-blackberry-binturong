import djs from "../../data/djs.json";
import shows from "../../data/shows.json";
import playlists from "../../data/playlists.json";
import songs from "../../data/songs.json";
import {
  knex,
  getDJNames,
  getAllShows,
  getShow,
  getPlaylist,
  addPlaylist,
  getAllPlaylists,
  updatePlaylist,
  getAllSongs,
  addSong,
  deleteSong,
  updateSong,
  getAllDJs,
  verifyEmail,
} from "./backend-utils.js";

jest.setTimeout(1000 * 20);

describe("Tests of the database utility functions", () => {
  let sampleShow;

  beforeAll(async () => {
    sampleShow = shows[Math.floor(shows.length/2)];
    sampleShow.DJs = sampleShow.DJs.map((id) => djs.find((dj) => dj.id === id).name);
  });


  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

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
    const properties = ["id", "title", "description", "hour", "day", "duration", "DJs", "genres"];
    properties.forEach((prop) => {expect(fetchedShows[0]).toHaveProperty(prop)});
  });

  test("getAllShows loads the correct DJs", async () => {
    const fetchedShows = await getAllShows();
    const testShow = fetchedShows.find((show) => show.id === sampleShow.id);

    expect(testShow.DJs.length).toBe(sampleShow.DJs.length);
    expect(testShow.DJs).toEqual(expect.arrayContaining(sampleShow.DJs));
  });

  test("getPlaylist fetches the correct playlist", async () => {
    const samplePlaylist = playlists[0];
    const playlist = await getPlaylist(samplePlaylist.id);
    expect(playlist.id).toBe(samplePlaylist.id);
    expect(playlist.date).toBe(samplePlaylist.date);
    expect(playlist.showId).toBe(samplePlaylist.showId);
  });

  test("getAllPlaylists fetches all playlists", async () => {
    const fetchedPlaylists = await getAllPlaylists();
    expect(fetchedPlaylists).toHaveLength(playlists.length);
    const properties = ["id", "date", "showId", "current"];
    properties.forEach((prop) => {expect(fetchedPlaylists[0]).toHaveProperty(prop)});
  });

  test("addPlaylist returns a playlist with new id", async () => {
    const sample = {
      "date": "4-30-2021",
      "showId": 55,
      "current": false
    };
    
    const playlist = await addPlaylist(sample);
    expect(playlist.date).toBe(sample.date);
    expect(playlist.showId).toBe(sample.showId);
    expect(playlist.id).toBeGreaterThanOrEqual(0);
  });

  test("updatePlaylist updates the song", async () => {
    const sample = {...playlists[0], current: true};
    const success = await updatePlaylist(sample);
    expect(success).toBeTruthy();
    const rows = await knex("Playlist").where({ id: sample.id }).select();

    const playlist = rows[0];
    expect(playlist.date).toBe(sample.date);
  });

  test("updatePlaylist returns 0 if the id doesn't exist", async () => {
    const sample = {...playlists[0], id: -1};
    const success = await updatePlaylist(sample);
    expect(success).toBeFalsy();
  });

  test("getAllSongs fetches all songs", async () => {
    const fetchedSongs = await getAllSongs();
    expect(fetchedSongs).toHaveLength(songs.length);
    const properties = ["id", "title", "artist", "album", "albumArt", "time", "playlistId"];
    properties.forEach((prop) => {expect(fetchedSongs[0]).toHaveProperty(prop)});
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
    expect(song.title).toBe(sample.title);
  });

  test("updateSong returns 0 if the id doesn't exist", async () => {
    const sample = { id: -1, title: "Bad Song" };
    const success = await updateSong(sample);
    expect(success).toBeFalsy();
  });

  test("getAllDJs fetches all djs", async () => {
    const fetchedDJs = await getAllDJs();
    expect(fetchedDJs).toHaveLength(djs.length);
    const properties = ["id", "name", "email", "exec"];
    properties.forEach((prop) => {expect(fetchedDJs[0]).toHaveProperty(prop)});
  });

  test("Verifies correct email", async () => {
    const sampleDJ = djs[Math.floor(djs.length / 2)];
    const result = await verifyEmail(sampleDJ.email);
    expect(result).toBeTruthy();
  });

  test("rejects incorrect email", async () => {
    const result = await verifyEmail("sampleperson@middlebury.edu");
    expect(result).toBeFalsy();
  });
});