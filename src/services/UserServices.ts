import KnexInstance from '../connection/db_connection';
import { IUser } from '../models/IUser';
import IUserServices from './IUserServices';

export class UserServices implements IUserServices {
	async findAll(): Promise<IUser[]> {
		const users = await KnexInstance<IUser>('users').select('*');
		return users;
	}

	async registerEmail({ name, email }: Partial<IUser>): Promise<Partial<IUser>> {
		const verificaEmail = await KnexInstance<IUser>('users').where('email', email).first();

		if (verificaEmail) {
			throw new Error('Email já cadastrado');
		}

		const user = await KnexInstance<IUser>('users')
			.insert({ name, email })
			.returning(['name', 'email'])
			.then((user) => user[0]);
		return user;
	}
}
