import djData from "../../data/djs.json";
import {
  knex,
  verifyEmail
} from "./backend-utils";

describe("Tests of the database utility functions", () => {
 
 beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  test("Verifies correct email", async () => {
    const sampleDJ = djData[Math.floor(djData.length / 2)];
    const result = await verifyEmail(sampleDJ.email);
    expect(result).toBeTruthy();
  });

  test("rejects incorrect email", async () => {
    const result = await verifyEmail("sampleperson@middlebury.edu");
    expect(result).toBeFalsy();
  });
  
});