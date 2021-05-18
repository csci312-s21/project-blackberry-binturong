import knexConfig from "../../knexfile";
import knexInitializer from "knex";


export const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || "development"]
);

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