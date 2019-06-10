'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
	get table() { return 'chats' }
	static async findChat(t, f) {
		let query = await Chat
			.query().where({
				from_id: f,
				to_id: t
			}).orWhere({
				from_id: t,
				to_id: f
			}).first();
		return query;
	}
	/**
	 *
	 * @param {Object} data
	 */
	static async newChat(data) {
		let chat = new Chat();
		for (let e of Object.entries(data)) {
			chat[e[0]] = e[1]
		}
		let save = await chat.save()
		return save;
	}
}

module.exports = Chat
