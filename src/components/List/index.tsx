import React from 'react';
import {ListItem} from 'types';
import {trackEvent} from 'track';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}

const List = ({items, hasNavigation = true, isLoading}: Props) => {
    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading &&
                items?.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                            trackEvent={() =>
                                trackEvent('Team Card Click', {
                                    id: navigationProps?.id,
                                })
                            }
                        />
                    );
                })}
            {items?.length === 0 && <p>There are no results at the moment</p>}
        </Container>
    );
};

export default List;
