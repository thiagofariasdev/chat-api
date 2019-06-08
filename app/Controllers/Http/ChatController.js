'use strict'
// @ts-check
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Auth*/

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
		let User = await auth.user;
		return User;
		// User.chats();
	}

	/**
	 * Create/save a new chat.
	 * POST chats
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
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
