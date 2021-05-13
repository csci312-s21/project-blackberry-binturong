import knexConfig from '../../knexfile';
import knexInitializer from 'knex';

const knex = knexInitializer(
  knexConfig[process.env.NODE_ENV || 'development']
);
