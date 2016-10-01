
module.exports.up = function migrateUp(knex) {
  return knex.schema.createTable('configurations', (table) => {
    table.increments('id').primary();
    table.string('rule').notNullable();
    table.string('user_id').notNullable().defaultTo('');
    table.string('ip_address').notNullable();
    table.string('configuration').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.unique(['rule', 'user_id', 'ip_address']);
  });
};

module.exports.down = function migrateDown(knex) {
  return knex.schema.dropTable('configurations');
};
