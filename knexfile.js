module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './wrmc.sqlite3',
    },
    useNullAsDefault: true,
  },
<<<<<<< HEAD

=======
>>>>>>> bff7240a2229854e6405f4c2fd84fa9ea2d51fec
  test: {
    client: 'sqlite3',
    connection: ":memory:",
    useNullAsDefault: true,
    seeds: {
<<<<<<< HEAD
      directory: './seeds/test',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
=======
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
>>>>>>> bff7240a2229854e6405f4c2fd84fa9ea2d51fec
  },
};
