import React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useGetTeamOverview} from 'hooks/useGetTeamOverview';
import {useGetUserData} from 'hooks/useGetUserData';
import {mapTeamLead} from 'utils/mappers/data-mappers';
import {UserCard} from 'components/UserCard';
import {Spinner} from 'components/Spinner';
import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import Card from 'components/Card';
import {TeamMembersContainer} from './styles';

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();

    const {data, isLoading: isLoadingTeamOverview} = useGetTeamOverview(teamId, Boolean(teamId));
    const teamLeadId = data?.teamLeadId;
    const teamMemberIds = data?.teamMemberIds ?? [];
    const {data: teamLead, isLoading: isTeamLeadLoading} = useGetUserData(
        teamLeadId,
        Boolean(teamLeadId)
    );

    const teamLeadData = mapTeamLead(teamLead);
    const isLoading = isLoadingTeamOverview || isTeamLeadLoading;

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {isLoading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <Card
                        url={teamLeadData.url}
                        columns={teamLeadData.columns}
                        navigationProps={teamLeadData.navigationProps}
                    />

                    <TeamMembersContainer>
                        {teamMemberIds?.map(teamMemberId => (
                            <UserCard key={teamMemberId} id={teamMemberId} hasNavigation />
                        ))}
                    </TeamMembersContainer>
                </React.Fragment>
            )}
        </Container>
    );
};

export default TeamOverview;
