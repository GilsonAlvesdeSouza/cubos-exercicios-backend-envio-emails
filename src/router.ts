import { Router, Request, Response } from 'express';
import { UserController } from './controllers/UserController';

const userController = new UserController();

const router = Router();

router.get('/', userController.index);

router.post('/cadastrar', userController.registerEmail);

router.post('/disparar-email-usuarios', userController.sendEmailToAllUsers);
export default router;
