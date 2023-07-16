import React, {useEffect} from 'react';
import Card from 'components/Card';
import {useGetAllTeamMembers} from 'hooks/useGetAllTeamMembers';
import {mapUsers} from 'utils/mappers/data-mappers';

interface TeamMembersCardListProps {
    teamMemberIds: string[];
    searchValue?: string;
}

const TeamMembersCardList = ({teamMemberIds, searchValue = ''}: TeamMembersCardListProps) => {
    const {teamMembers, mutation} = useGetAllTeamMembers(teamMemberIds);
    const teamUsersData = mapUsers({users: teamMembers, searchValue});

    useEffect(() => {
        if (teamMemberIds.length !== teamMembers.length && !mutation.isLoading) {
            mutation.mutate();
        }
        // Mutation can't be put on dependencies array or it will trigger an infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamMemberIds.length, teamMembers.length]);

    return (
        <React.Fragment>
            {teamUsersData.map(member => (
                <Card
                    key={member.id}
                    url={member.url}
                    columns={member.columns}
                    navigationProps={member.navigationProps}
                />
            ))}
        </React.Fragment>
    );
};

export default TeamMembersCardList;
