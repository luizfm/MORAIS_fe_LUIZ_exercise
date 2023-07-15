import React from 'react';
import {useGetTeams} from 'hooks/useGetTeams';
import {mapTeams} from 'utils/mappers/data-mappers';
import Header from '../../components/Header';
import List from '../../components/List';
import {Container} from '../../components/GlobalComponents';

const Teams = () => {
    const {data: teams, isLoading} = useGetTeams();

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={mapTeams(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
