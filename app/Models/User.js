'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
	static get connection() {
		return 'mysql'
	}
	static get table() {
		return 'users'
	}
	static boot() {
		super.boot()

		/**
		 * A hook to hash the user password before saving
		 * it to the database.
		 */
		this.addHook('beforeSave', async (userInstance) => {
			if (userInstance.dirty.password) {
				userInstance.password = await Hash.make(userInstance.password)
			}
		})
	}

	/**
	 * A relationship on tokens is required for auth to
	 * work. Since features like `refreshTokens` or
	 * `rememberToken` will be saved inside the
	 * tokens table.
	 *
	 * @method tokens
	 *
	 * @return {Object}
	 */
	tokens() {
		return this.hasMany('App/Models/Token')
	}

	/**
	 * A relationship of Chats
	 *
	 * @method fromChats
	 *
	 * @returns {Object}
	 */
	fromChats() {
		return this.hasMany('App/Models/Chat', 'id', 'from_id');
	}
	/**
	 * A relationship of Chats
	 *
	 * @method toChats
	 *
	 * @returns {Object}
	 */
	toChats() {
		return this.hasMany('App/Models/Chat', 'id', 'to_id');
	}

	async chats() {
		let fc = await this.fromChats().fetch();
		let tc = await this.toChats().fetch();

		return fc, tc;
	}
	static async exists(id) {
		let user = await User.find(id);
		return user != undefined;
	}
	static async createUser(data) {
		let user = new User();
		for (let e of Object.entries(data)) {
			user[e[0]] = e[1]
		}
		let save = await user.save()
		return save;
	}
}

module.exports = User
