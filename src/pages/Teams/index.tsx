import React, {useState} from 'react';
import {useGetTeams} from 'hooks/useGetTeams';
import {mapTeams} from 'utils/mappers/data-mappers';
import {useForm} from 'react-hook-form';
import {SearchInput} from 'components/SearchInput';
import {useFilterParams} from 'hooks/useFilterParams';
import Header from '../../components/Header';
import List from '../../components/List';
import {Container} from '../../components/GlobalComponents';

interface FormData {
    searchTeam: string;
}

const Teams = () => {
    const {setUrlParams, getParam} = useFilterParams();

    const [searchValue, setSearchValue] = useState(getParam('name'));
    const {register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            searchTeam: getParam('name'),
        },
    });

    const {data: teams, isLoading} = useGetTeams();

    const onSubmit = handleSubmit((formData: FormData) => {
        setSearchValue(formData.searchTeam);
        setUrlParams(formData.searchTeam, 'name');
    });

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <form onSubmit={onSubmit}>
                <SearchInput
                    id="searchInput"
                    label="Search for a team"
                    placeholder="Onyx Team..."
                    {...register('searchTeam')}
                />
            </form>
            <List items={mapTeams({teams, searchValue})} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
