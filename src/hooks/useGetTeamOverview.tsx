import {getTeamOverview} from 'api';
import {useQuery} from 'react-query';
import {TeamOverview} from 'types';

export const useGetTeamOverview = (teamId: string, enabled = false) => {
    const {data, isLoading, error} = useQuery<TeamOverview>(
        ['teamOverview', teamId],
        () => getTeamOverview(teamId),
        {enabled}
    );

    return {
        data,
        isLoading,
        error,
    };
};
