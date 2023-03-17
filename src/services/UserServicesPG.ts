import knexInstancePG from '../connection/pg_connection';
import { IUser } from '../models/IUser';
import IUserServices from './IUserServices';

export class UserServicesPG implements IUserServices {
	async findAll(): Promise<IUser[]> {
		const users = await knexInstancePG<IUser>('users').select('*');
		return users;
	}

	async registerEmail({ name, email }: Partial<IUser>): Promise<Partial<IUser>> {
		const verificaEmail = await knexInstancePG<IUser>('users').where('email', email).first();

		if (verificaEmail) {
			throw new Error('Email já cadastrado');
		}

		const user = await knexInstancePG<IUser>('users')
			.insert({ name, email })
			.returning(['name', 'email'])
			.then((user) => user[0]);
		return user;
	}
}
