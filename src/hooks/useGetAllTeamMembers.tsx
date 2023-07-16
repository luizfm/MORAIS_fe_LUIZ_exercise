import {useQueries} from 'react-query';
import {getUserData} from 'services/users';

import {useGetUserData} from './useGetUserData';

type UseGetAllTeamMembersProps = {
    teamMemberIds: string[];
    teamLeadId: string;
    searchValue?: string;
};

export const useGetAllTeamMembers = ({teamLeadId, teamMemberIds}: UseGetAllTeamMembersProps) => {
    const userQueries = useQueries(
        teamMemberIds.map(id => ({queryKey: ['userData', id], queryFn: () => getUserData(id)}))
    );

    const teamMembers = userQueries.map(query => query.data);

    const {data: teamLead, isLoading: isTeamLeadDataLoading} = useGetUserData(teamLeadId);

    const isLoading = userQueries.some(query => query.isLoading) || isTeamLeadDataLoading;

    return {
        team: {
            teamLead,
            teamMembers,
        },
        isLoading,
    };
};
