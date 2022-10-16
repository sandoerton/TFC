import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validate from '../middlewares/validations';

const userRoute = Router();
const controller = new UserController();

userRoute.post('/', validate.login, controller.findUser);
userRoute.get('/validate', controller.findRole);

export default userRoute;
