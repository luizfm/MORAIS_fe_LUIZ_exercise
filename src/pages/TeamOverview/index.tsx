import React, {useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {useGetTeamOverview} from 'hooks/useGetTeamOverview';

import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';

import {SearchInput} from 'components/SearchInput';
import {useForm} from 'react-hook-form';

import TeamMembersCardList from 'components/TeamMembersCardList';
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

    const {data, isLoading} = useGetTeamOverview(teamId, Boolean(teamId));
    const teamLeadId = data?.teamLeadId;
    const teamMemberIds = data?.teamMemberIds ?? [];

    const onSubmit = handleSubmit((formData: FormData) => {
        setSearchValue(formData.searchMember);
    });

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            <form onSubmit={onSubmit}>
                <SearchInput
                    id="searchMember"
                    label="Search for a member"
                    {...register('searchMember')}
                />
            </form>

            <TeamMembersContainer>
                <TeamMembersCardList
                    teamMemberIds={teamMemberIds}
                    teamLeadId={teamLeadId}
                    searchValue={searchValue}
                    isLoading={isLoading}
                />
            </TeamMembersContainer>
        </Container>
    );
};

export default TeamOverview;
