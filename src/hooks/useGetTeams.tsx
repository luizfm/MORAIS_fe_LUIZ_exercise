import {useQuery} from 'react-query';
import {getTeams} from 'services/teams';
import {Teams} from 'types';

export const useGetTeams = (filter = '') => {
    const query = useQuery<Teams[]>('teams', getTeams);

    if (filter && query.isSuccess) {
        return {
            ...query,
            data: query.data.filter(team =>
                team.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            ),
        };
    }

    return query;
};
