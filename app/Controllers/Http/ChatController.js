'use strict'
// @ts-check
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} Auth*/

/**
 * Resourceful controller for interacting with chats
 */
const Chat = use('App/Models/Chat');
const User = use('App/Models/User');

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
		let { to_id, last_message_time, last_message } = request.only([
			'to_id',
			'last_message_time',
			'last_message'
		]);
		if (!User.exists(to_id)) { return { success: false, msg: 'User not found' } }
		let exists = await Chat.findChat(to_id, user.id);
		if (!exists) {
			let chat = await Chat.newChat({ from_id: user.id, to_id, last_message_time, last_message });
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
