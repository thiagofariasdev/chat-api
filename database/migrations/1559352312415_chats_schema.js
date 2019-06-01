'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatsSchema extends Schema {
  up() {
    this.create('chats', (table) => {
      table.increments()
      table.integer('from_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('to_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('last_message', 255)
      table.datetime('last_message_time')
      table.timestamps()
    })
  }

  down() {
    this.drop('chats')
  }
}

module.exports = ChatsSchema
