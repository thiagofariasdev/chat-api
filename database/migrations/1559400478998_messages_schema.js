'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up() {
    this.create('messages', (table) => {
      table.increments()
      table.integer('from_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('chat_id').unsigned().references('id').inTable('chats').onDelete('CASCADE')
      table.text('message')
      table.timestamps()
    })
  }

  down() {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
