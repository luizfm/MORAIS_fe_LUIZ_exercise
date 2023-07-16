import React from 'react';
import {useParams} from 'react-router-dom';
import {useGetUserData} from 'hooks/useGetUserData';
import {mapUser} from 'utils/mappers/data-mappers';
import {Spinner} from 'components/Spinner';
import Card from '../../components/Card';
import {Container} from '../../components/GlobalComponents';
import Header from '../../components/Header';

const UserOverview = () => {
    const params = useParams();
    const {data, isLoading} = useGetUserData(params.userId);

    const user = mapUser(data);

    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading && (
                <React.Fragment>
                    <Header title={`User ${data.firstName} ${data.lastName}`} />
                    <Card
                        columns={user.columns}
                        hasNavigation={false}
                        navigationProps={user.navigationProps}
                    />
                </React.Fragment>
            )}
        </Container>
    );
};

export default UserOverview;
