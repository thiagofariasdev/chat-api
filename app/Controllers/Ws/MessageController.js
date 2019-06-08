'use strict'

class MessageController {
	constructor({ socket, request }) {
		this.socket = socket
		this.request = request
	}
	async onOpen() {
		/**
		 * Deverá registrar socket.id para o usuário
		 */
	}
}

module.exports = MessageController
