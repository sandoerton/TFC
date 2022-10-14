import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/validations';

const userRoute = Router();
const controller = new UserController();

userRoute.post('/', validateLogin, controller.findUser);
userRoute.get('/validate', controller.findRole);

export default userRoute;
