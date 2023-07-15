import {getData} from 'api';
import {TeamOverview, Teams} from 'types';

export const getTeams = (): Promise<Teams[]> => {
  return getData('/teams');
};

export const getTeamOverview = (teamId: string): Promise<TeamOverview> => {
  return getData(`/teams/${teamId}`);
};