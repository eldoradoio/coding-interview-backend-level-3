import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      // los datos los quemo, porque es una prueba y es gratis lo logico es usar el .env
      host: 'database-1.cfgiksiwms54.us-east-2.rds.amazonaws.com',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      ssl: { rejectUnauthorized: false },
    },
  },
};

export default config;
