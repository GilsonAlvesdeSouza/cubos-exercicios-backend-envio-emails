import knexInstanceMySQL from '../connection/mysql_connection';
import {IUser} from '../models/IUser';
import IUserServices from './IUserServices';

export class UserServicesMySQL implements IUserServices {
	async findAll(): Promise<IUser[]> {
		const users = await knexInstanceMySQL<IUser>('users').select('*');
		return users;
	}

	async registerEmail({name, email}: Partial<IUser>): Promise<Partial<IUser>>  {
		const verificaEmail = await knexInstanceMySQL<IUser>('users').where('email', email).first();

		if (verificaEmail) {
			throw new Error('Email já cadastrado');
		}

		const userId = await knexInstanceMySQL<IUser>('users')
			.insert({name, email})
			.select('id')
			.then((user) => user[0]);

		const user: Partial<IUser> = await knexInstanceMySQL<IUser>('users')
			.select("name", "email")
			.where('id', userId)
			.first() as Partial<IUser>;
		return user;
	}
}
