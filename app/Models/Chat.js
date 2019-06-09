'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
	get table() { return 'chats' }
}

module.exports = Chat
