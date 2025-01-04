// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};

export const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
  debug: true,
  migrations,
  log: {
    warn(message) {
      console.warn('Knex Warning:', message);
    },
    error(message) {
      console.error('Knex Error:', message);
    },
    deprecate(message) {
      console.log('Knex Deprecation Warning:', message);
    },
    debug(message) {
      console.log('Knex Debug:', message);
    },
  },
};

export const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  // debug: true,
  migrations,
};

export const production = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
  migrations,
};
