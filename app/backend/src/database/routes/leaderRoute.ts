import { Router } from 'express';
import LeaderController from '../controllers/leader.controller';

const leaderRoute = Router();
const controller = new LeaderController();

leaderRoute.get('/home', controller.leaderBoard);

export default leaderRoute;
