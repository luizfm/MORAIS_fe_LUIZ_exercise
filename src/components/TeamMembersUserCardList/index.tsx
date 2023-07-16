import {UserCard} from 'components/UserCard';
import React from 'react';

interface TeamMembersUserCardListProps {
    teamMemberIds: string[];
    searchValue?: string;
}

const TeamMembersUserCardList = ({
    teamMemberIds,
    searchValue = '',
}: TeamMembersUserCardListProps) => {
    return (
        <React.Fragment>
            {teamMemberIds?.map(teamMemberId => (
                <UserCard
                    searchValue={searchValue}
                    key={teamMemberId}
                    id={teamMemberId}
                    hasNavigation
                />
            ))}
        </React.Fragment>
    );
};

export default TeamMembersUserCardList;
