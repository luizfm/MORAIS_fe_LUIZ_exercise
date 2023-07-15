import {useQuery} from 'react-query';
import {getTeamOverview} from 'services/teams';
import {TeamOverview} from 'types';

export const useGetTeamOverview = (teamId: string, enabled = false) => {
    return useQuery<TeamOverview>(['teamOverview', teamId], () => getTeamOverview(teamId), {
        enabled,
    });
};
