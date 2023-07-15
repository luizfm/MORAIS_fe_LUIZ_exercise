import {useQuery} from 'react-query';
import {getTeams} from 'services/teams';
import {Teams} from 'types';

export const useGetTeams = () => {
    const {data, isLoading, error} = useQuery<Teams[]>('teams', getTeams);

    return {
        data,
        isLoading,
        error,
    };
};
