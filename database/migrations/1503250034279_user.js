'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
	up() {
		this.create('users', (table) => {
			table.increments()
			table.string('avatar', 255)
			table.boolean('active')
			table.string('name', 80)
			table.string('email', 255).unique()
			table.string('password', 255)
			table.timestamps()
		})
	}

	down() {
		this.drop('users')
	}
}

module.exports = UserSchema
