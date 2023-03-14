import transporter from '../connection/email_connection';
import 'dotenv/config';
import { Request, Response } from 'express';
import { UserServices } from '../services/UserServices';
import { getErrorMessage } from '../utils/handleError';
import { UserInterface } from '../models/UserInterface';

const userServices = new UserServices();

export class UserController {
	async index(req: Request, res: Response) {
		const users = await userServices.all();
		return res.json(users);
	}

	async registerEmail(req: Request, res: Response) {
		const { name, email } = req.body;

		if (!name || name === '') {
			return res.status(400).json({ error: 'Nome é obrigatório' });
		}

		if (!email || email === '') {
			return res.status(400).json({ error: 'Email é obrigatório' });
		}
		try {
			const user = await userServices.save({ name, email });
			return res.json(user);
		} catch (e) {
			return res.status(400).json({ error: getErrorMessage(e) });
		}
	}

	async sendEmailToAllUsers(req: Request, res: Response) {
		const { message, subject } = req.body;
		const users = await userServices.all();

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
			await transporter.sendMail({
				from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
				to: users.map((user: UserInterface) => user.email),
				subject: subject,
				text: message
			});
			res.json({ message: 'emails enviados' });
		} catch (e) {
			return res.status(400).json({ error: getErrorMessage(e) });
		}
	}
}
