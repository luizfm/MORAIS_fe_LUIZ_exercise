import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useGetTeamOverview} from 'hooks/useGetTeamOverview';

import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';

import {SearchInput} from 'components/SearchInput';
import {useForm} from 'react-hook-form';

import TeamMembersCardList from 'components/TeamMembersCardList';
import {Spinner} from 'components/Spinner';
import {useFilterParams} from 'hooks/useFilterParams';
import {TeamMembersContainer} from './styles';

interface FormData {
    searchMember: string;
}

const TeamOverview = () => {
    const {setUrlParams, getParam} = useFilterParams();
    const [searchValue, setSearchValue] = useState(getParam('name'));
    const {register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            searchMember: getParam('name'),
        },
    });

    const {teamId} = useParams();

    const {data, isLoading} = useGetTeamOverview(teamId, Boolean(teamId));
    const teamLeadId = data?.teamLeadId;
    const teamMemberIds = data?.teamMemberIds ?? [];

    const onSubmit = handleSubmit((formData: FormData) => {
        setSearchValue(formData.searchMember);
        setUrlParams(formData.searchMember, 'name');
    });

    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading && (
                <React.Fragment>
                    <Header title={`Team ${data?.name}`} />
                    <form onSubmit={onSubmit}>
                        <SearchInput
                            id="searchMember"
                            label="Search for a member"
                            placeholder="John Doe..."
                            {...register('searchMember')}
                        />
                    </form>

                    <TeamMembersContainer>
                        <TeamMembersCardList
                            teamMemberIds={teamMemberIds}
                            teamLeadId={teamLeadId}
                            searchValue={searchValue}
                        />
                    </TeamMembersContainer>
                </React.Fragment>
            )}
        </Container>
    );
};

export default TeamOverview;
