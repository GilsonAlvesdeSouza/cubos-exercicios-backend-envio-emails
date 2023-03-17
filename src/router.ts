import { Router } from 'express';
import { UserController } from './controllers/UserController';
import {container} from "tsyringe";

const userController =  container.resolve(UserController);

const router = Router();

router.get('/', userController.findAll);

router.post('/cadastrar', userController.registerEmail);

router.post('/disparar-email-usuarios', userController.sendEmailToAllUsers);
export default router;
