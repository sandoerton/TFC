import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRoute = Router();
const controller = new MatchController();

matchRoute.get('/', controller.findMatches);

export default matchRoute;
