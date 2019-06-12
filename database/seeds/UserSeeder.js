'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class UserSeeder {
	async run() {
		const users = await Factory.model('App/Models/User').createMany(30);
		const data = await Database.table('users');
		console.log(data);
	}
}

module.exports = UserSeeder
