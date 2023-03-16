import transporter from '../connection/email_connection';
import 'dotenv/config';
import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/handleError';
import compilerHTML from '../utils/compilerHTML';
import IUserServices from '../services/IUserServices';
import { IUser } from '../models/IUser';

export class UserController {
	readonly userServices: IUserServices;
	constructor(userServices: IUserServices) {
		this.userServices = userServices;
		this.findAll = this.findAll.bind(this);
		this.registerEmail = this.registerEmail.bind(this);
		this.sendEmailToAllUsers = this.sendEmailToAllUsers.bind(this);
	}
	async findAll(req: Request, res: Response): Promise<Response> {
		const users: IUser[] = await this.userServices.findAll();
		return res.json(users);
	}

	async registerEmail(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body;

		if (!name || name === '') {
			return res.status(400).json({ error: 'Nome é obrigatório' });
		}

		if (!email || email === '') {
			return res.status(400).json({ error: 'Email é obrigatório' });
		}
		try {
			const user = await this.userServices.registerEmail({ name, email });
			return res.json(user);
		} catch (e) {
			return res.status(400).json({ error: getErrorMessage(e) });
		}
	}

	async sendEmailToAllUsers(req: Request, res: Response): Promise<Response> {
		const { message, subject } = req.body;
		const users = await this.userServices.findAll();

		if (!message || message === '') {
			return res.status(400).json({ error: 'Mensagem é obrigatória' });
		}

		if (!subject || subject === '') {
			return res.status(400).json({ error: 'Assunto é obrigatório' });
		}

		if (users.length < 1) {
			return res.status(400).json({ error: 'Não há usuários cadastrados' });
		}

		try {
			for (const user of users) {
				const html = await compilerHTML('./src/templates/shootEmail.html', {
					subject,
					message,
					name: user.name
				});

				transporter.sendMail({
					from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
					to: `${user.name} <${user.email}>`,
					subject: subject,
					html
				});
			}
			return res.json({ message: 'emails enviados' });
		} catch (e) {
			return res.status(400).json({ error: getErrorMessage(e) });
		}
	}
}
