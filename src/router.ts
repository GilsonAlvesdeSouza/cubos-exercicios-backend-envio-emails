import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { UserServices } from './services/UserServices';

const userController = new UserController(new UserServices());

const router = Router();

router.get('/', userController.findAll);

router.post('/cadastrar', userController.registerEmail);

router.post('/disparar-email-usuarios', userController.sendEmailToAllUsers);
export default router;
