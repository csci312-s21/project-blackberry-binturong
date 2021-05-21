import djs from "../../data/djs.json";
import shows from "../../data/shows.json";


import {
  knex,
  getDJNames,
  getAllShows,
  getShow
} from "./backend-utils.js";

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

  test("getShow fetches show with the correct DJs", async() =>{ 
    const show = await getShow(sampleShow.id);
    expect(show.DJs.length).toBe(sampleShow.DJs.length);
    expect(show.DJs).toEqual(expect.arrayContaining(sampleShow.DJs));

  });

  test("getShow returns null on bad id", async () => {
    const show = await getShow(-1);
    expect(show).toBeNull();
  });

  test("getAllShows fetches all shows", async() => {
      const fetchedShows = await getAllShows();
      expect(fetchedShows).toHaveLength(shows.length);
      const testShow = fetchedShows.find((show) => show.id === sampleShow.id);
      expect(testShow).toEqual(sampleShow);
      const properties = ["id", "title", "description", "hour", "day", "duration", "DJs", "genres"];
      properties.forEach((prop) => {expect(fetchedShows[0]).toHaveProperty(prop)});
  });

  test("getAllShows loads the correct DJs", async() => {
    const fetchedShows = await getAllShows();
    const testShow = fetchedShows.find((show) => show.id === sampleShow.id);

    expect(testShow.DJs.length).toBe(sampleShow.DJs.length);
    expect(testShow.DJs).toEqual(expect.arrayContaining(sampleShow.DJs));
  });
});