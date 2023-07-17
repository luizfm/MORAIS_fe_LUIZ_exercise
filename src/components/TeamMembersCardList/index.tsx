import React from 'react';
import Card from 'components/Card';
import {useGetAllTeamMembers} from 'hooks/useGetAllTeamMembers';
import {mapTeamLead, mapUsers} from 'utils/mappers/data-mappers';
import {Spinner} from 'components/Spinner';
import {trackEvent} from 'track';

interface TeamMembersCardListProps {
    teamMemberIds: string[];
    teamLeadId: string;
    searchValue?: string;
}

const TeamMembersCardList = ({
    teamMemberIds,
    teamLeadId,
    searchValue = '',
}: TeamMembersCardListProps) => {
    const {team, isLoading} = useGetAllTeamMembers({
        teamMemberIds,
        teamLeadId,
    });

    const teamLeadData = mapTeamLead({user: team?.teamLead, searchValue});
    const teamUsersData = mapUsers({users: team?.teamMembers, searchValue});

    return (
        <React.Fragment>
            {isLoading && <Spinner />}
            {!isLoading && (
                <React.Fragment>
                    {teamLeadData && (
                        <Card
                            id={teamLeadId}
                            url={teamLeadData.url}
                            columns={teamLeadData.columns}
                            navigationProps={teamLeadData.navigationProps}
                            trackEvent={() =>
                                trackEvent('Team Lead Card Clicked', {
                                    id: teamLeadData.navigationProps.id,
                                    name: teamLeadData.navigationProps.displayName,
                                })
                            }
                        />
                    )}

                    {teamUsersData?.map(member => (
                        <Card
                            key={member.id}
                            id={member.id}
                            url={member.url}
                            columns={member.columns}
                            navigationProps={member.navigationProps}
                            trackEvent={() =>
                                trackEvent('Team Member Card Clicked', {
                                    id: member.navigationProps.id,
                                    name: member.navigationProps.displayName,
                                })
                            }
                        />
                    ))}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default TeamMembersCardList;
