import { IUser } from '../models/IUser';

interface IUserServices {
	findAll(): Promise<IUser[]>;
	registerEmail({ name, email }: Partial<IUser>): Promise<Partial<IUser>>;
}

export default IUserServices;
