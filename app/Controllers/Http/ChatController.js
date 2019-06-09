'use strict'
// @ts-check
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth*/

/**
 * Resourceful controller for interacting with chats
 */
const Chat = use('App/Models/Chat');

class ChatController {
	/**
	 * Show a list of all chats.
	 * GET chats
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {Auth} ctx.auth
	 */
	async index({ request, response, auth }) {
		let user = await auth.getUser();
		return await user.chats();
	}

	/**
	 * Create/save a new chat.
	 * POST chats
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {Auth} ctx.auth
	 */
	async store({ request, response, auth }) {
		let user = await auth.getUser()
		let exists = await Chat.query().where('from_id', user.id).orWhere('to_id', user.id).first()
		if (!exists) {
			let col = request.collect([
				'to_id',
				'last_message_time',
				'last_message'
			]);
			col[0].from_id = user.id
			let chat = await Chat.createMany(col);
			response.json({ success: true, data: chat, hole: 'created' });
		} else {
			response.json({ success: true, data: exists, hole: 'exists' });
		}
	}

	/**
	 * Display a single chat.
	 * GET chats/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async show({ params, request, response }) {
		let chat = await Chat.findOrFail(params.id);
		return chat;
	}

	/**
	 * Render a form to update an existing chat.
	 * GET chats/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async edit({ params, request, response }) {
	}

	/**
	 * Update chat details.
	 * PUT or PATCH chats/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
	}

	/**
	 * Delete a chat with id.
	 * DELETE chats/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
	}
}

module.exports = ChatController
