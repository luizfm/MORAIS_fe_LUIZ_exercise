import {useQuery} from 'react-query';
import {getTeams} from 'services/teams';
import {Teams} from 'types';

export const useGetTeams = () => {
    return useQuery<Teams[]>('teams', getTeams);
};
