import type { Knex } from "knex";

// Update with your config settings.

const configs: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: '',
        database: "knex_db"
    }
  }

    /*
  staging: {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: '',
        database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_db_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: '',
        database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_db_migrations'
    }
  }

  */

};

export default configs;
