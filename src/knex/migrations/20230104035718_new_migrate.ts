import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.
  hasTable('users')
  .then((exist) => {
       if (!exist) {
     knex.schema.createTable('users', t => {
        t.uuid('user_id').primary()
        t.string('email').notNullable().unique()
        t.string('firstname', 100).notNullable()
        t.string('lastname', 100).notNullable()
        t.string('password', 100).notNullable()
        t.timestamps(true, true)
        t.decimal('balance').notNullable()
        t.uuid('trans_id')
    })
    .createTable('transaction', t => {
      t.uuid('trans_id').primary()
      t.string('transaction_type').notNullable()
      t.string('sender', 100).notNullable()
      t.string('recepient', 100).notNullable();
      t.integer('amount').notNullable();
      t.timestamps(true, true)
      t.uuid('owner_user_id')
        .references('user_id')
        .inTable('users')
    })
    .table('users', t => {
        t.foreign('trans_id')
          .references('trans_id')
          .inTable('transaction')
    })
    .then(() => console.log("Table created."));
  }
})
}


export async function down(knex: Knex): Promise<void> {
}

