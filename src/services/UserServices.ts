import { UserInterface } from '../models/UserInterface';
import KnexInstance from '../connection/db_connection';

export class UserServices {
	async all() {
		const users = await KnexInstance<UserInterface>('users').select('*');
		return users;
	}

	async save({ name, email }: Partial<UserInterface>) {
		const verificaEmail = await KnexInstance<UserInterface>('users').where('email', email).first();

		if (verificaEmail) {
			throw new Error('Email já cadastrado');
		}

		const user = await KnexInstance<UserInterface>('users')
			.insert({ name, email })
			.returning(['name', 'email'])
			.then((user) => user[0]);
		return user;
	}
}
