// @ts-check

export const up = (knex) => (
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password_digest').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('statuses', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  .createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.integer('status_id').notNullable().references('id').inTable('statuses')
    table.integer('creator_id').notNullable().references('id').inTable('users')
    table.integer('executor_id').nullable().references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => (
  knex.schema
    .dropTable('statuses')
    .dropTable('users')
    .dropTable('tasks')
);
