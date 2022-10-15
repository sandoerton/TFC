import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRoute = Router();
const controller = new TeamController();

teamRoute.get('/', controller.findTeams);
teamRoute.get('/:id', controller.findById);

export default teamRoute;
