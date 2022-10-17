import ILeader from '../interfaces/leaderInterface';

const orderBoard = (board: ILeader[]) => {
  const sort = board.sort((a, b) =>
    b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  return sort as unknown as ILeader[];
};

export default orderBoard;
