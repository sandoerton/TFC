/* eslint-disable @typescript-eslint/no-explicit-any */
import calculate from '../helpers/calculate';
import orderBoard from '../helpers/orderBoard';
import ILeader from '../interfaces/leaderInterface';
import Matches from '../models/matches';
import Teams from '../models/teams';

class LeaderService {
  getAllTeams = async (): Promise<any> => {
    const result = await Teams.findAll({
      include: [{
        model: Matches,
        association: 'teamHome',
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      }, {
        model: Matches,
        association: 'teamAway',
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      }],
    });
    return result;
  };

  homeLeader = async (): Promise<ILeader[]> => {
    const allTeams = await this.getAllTeams();

    const homeBoard = (allTeams.map((team: any) => ({
      name: team.teamName,
      totalPoints: calculate.hPoints(team),
      totalGames: calculate.hGames(team),
      totalVictories: calculate.homeVictories(team),
      totalDraws: calculate.homeDraws(team),
      totalLosses: calculate.homeLosses(team),
      goalsFavor: calculate.homeGoals(team),
      goalsOwn: calculate.homeOwnGoals(team),
      goalsBalance: (calculate.homeGoals(team) - calculate.homeOwnGoals(team)),
      efficiency: Number((calculate.hPoints(team) / (calculate.hGames(team) * 3)) * 100).toFixed(2),
    })));

    const orderlyHomeBoard = orderBoard(homeBoard);

    return orderlyHomeBoard as unknown as ILeader[];
  };

  awayLeader = async (): Promise<ILeader[]> => {
    const allTeams = await this.getAllTeams();

    const awayBoard = (allTeams.map((team: any) => ({
      name: team.teamName,
      totalPoints: calculate.aPoints(team),
      totalGames: calculate.aGames(team),
      totalVictories: calculate.awayVictories(team),
      totalDraws: calculate.awayDraws(team),
      totalLosses: calculate.awayLosses(team),
      goalsFavor: calculate.awayGoals(team),
      goalsOwn: calculate.awayOwnGoals(team),
      goalsBalance: calculate.awayGoals(team) - calculate.awayOwnGoals(team),
      efficiency: Number((calculate.aPoints(team) / (calculate.aGames(team) * 3)) * 100).toFixed(2),
    })));

    const orderlyAwayBoard = orderBoard(awayBoard);

    return orderlyAwayBoard as unknown as ILeader[];
  };
}

export default LeaderService;
