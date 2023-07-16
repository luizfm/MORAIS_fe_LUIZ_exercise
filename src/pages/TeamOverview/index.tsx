import React, {useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useGetTeamOverview} from 'hooks/useGetTeamOverview';
import {useGetUserData} from 'hooks/useGetUserData';
import {mapTeamLead} from 'utils/mappers/data-mappers';
import {Spinner} from 'components/Spinner';
import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import Card from 'components/Card';
import {SearchInput} from 'components/SearchInput';
import {useForm} from 'react-hook-form';
import {isSearchedUser} from 'utils/filters/user-filters';
import {Flags, FlagsEnum} from 'Flags';
import TeamMembersCardList from 'components/TeamMembersCardList';
import TeamMembersUserCardList from 'components/TeamMembersUserCardList';
import {TeamMembersContainer} from './styles';

interface FormData {
    searchMember: string;
}

const TeamOverview = () => {
    const [searchValue, setSearchValue] = useState('');
    const {register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            searchMember: '',
        },
    });
    const location = useLocation();
    const {teamId} = useParams();

    const {data, isLoading: isLoadingTeamOverview} = useGetTeamOverview(teamId, Boolean(teamId));
    const teamLeadId = data?.teamLeadId;
    const teamMemberIds = data?.teamMemberIds ?? [];
    const {data: teamLead, isLoading: isTeamLeadLoading} = useGetUserData(
        teamLeadId,
        Boolean(teamLeadId)
    );

    const onSubmit = handleSubmit((formData: FormData) => {
        setSearchValue(formData.searchMember);
    });

    const teamLeadData = mapTeamLead(teamLead);
    const isLoading = isLoadingTeamOverview || isTeamLeadLoading;

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {isLoading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    <form onSubmit={onSubmit}>
                        <SearchInput
                            id="searchMember"
                            label="Search for a member"
                            {...register('searchMember')}
                        />
                    </form>
                    {isSearchedUser(searchValue, teamLead) && (
                        <Card
                            url={teamLeadData.url}
                            columns={teamLeadData.columns}
                            navigationProps={teamLeadData.navigationProps}
                        />
                    )}

                    <TeamMembersContainer>
                        <Flags
                            flag={FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON}
                            renderOnMatch={
                                <TeamMembersCardList
                                    teamMemberIds={teamMemberIds}
                                    searchValue={searchValue}
                                />
                            }
                            fallback={
                                <TeamMembersUserCardList
                                    teamMemberIds={teamMemberIds}
                                    searchValue={searchValue}
                                />
                            }
                        />
                    </TeamMembersContainer>
                </React.Fragment>
            )}
        </Container>
    );
};

export default TeamOverview;
