import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validate from '../middlewares/validations';

const matchRoute = Router();
const controller = new MatchController();

matchRoute.get('/', controller.findMatches);
matchRoute.post('/', validate.token, controller.createMatch);

export default matchRoute;
