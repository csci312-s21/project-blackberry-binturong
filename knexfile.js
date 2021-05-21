module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './wrmc.sqlite3',
    },
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: ":memory:",
    useNullAsDefault: true,
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
  },
};