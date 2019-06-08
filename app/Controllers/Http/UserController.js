'use strict'
/**@typedef {import('@adonisjs/auth/src/Schemes/Jwt')} AuthToken*/
/**@typedef {import('@adonisjs/framework/src/Request')} Request */
/**@type {import('')} */
const User = use('App/Models/User')

class UserController {
	/**
	 * @description Login a existent user
	 *
	 * @param {Object} ctx
	 * @param {AuthToken} ctx.auth
	 * @param {Request} ctx.request
	 */
	async login({ auth, request }) {
		let { email, password } = request.only(['email', 'password']);
		let { token } = await auth.attempt(email, password);
		return { token };
	}
	/**
	 * @description Creates a new user
	 *
	 * @param {Object} ctx
	 * @param {AuthToken} ctx.auth
	 * @param {Request} ctx.request
	 *
	 * @returns {Object}
	 */
	async register({ request, auth }) {
		let { email, password, name, active } = request.only(['email', 'password', 'name', 'active']);

		let user = new User();
		user.name = name;
		user.email = email;
		user.password = password;
		user.active = active;
		user.save();

		let { token } = await auth.attempt(email, password);

		return { token };
	}
}

module.exports = UserController
