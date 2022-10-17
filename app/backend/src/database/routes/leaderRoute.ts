import { Router } from 'express';
import LeaderController from '../controllers/leader.controller';

const leaderRoute = Router();
const controller = new LeaderController();

leaderRoute.get('/home', controller.homeBoard);
leaderRoute.get('/away', controller.awayBoard);

export default leaderRoute;
