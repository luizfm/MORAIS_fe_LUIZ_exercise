import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {mapUser} from 'utils/mappers/data-mappers';
import {useGetUserData} from 'hooks/useGetUserData';
import {UserCardContainer} from './styles';

interface UserCardProps {
    id?: string;
    hasNavigation?: boolean;
}

export const UserCard = ({id, hasNavigation}: UserCardProps) => {
    const navigate = useNavigate();
    const {data, isLoading} = useGetUserData(id);

    const {url, navigationProps, columns} = mapUser(data);

    const onCardClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (hasNavigation) {
                navigate(url, {
                    state: navigationProps,
                });
            }
            event.preventDefault();
        },
        [hasNavigation, navigate, navigationProps, url]
    );

    if (isLoading) {
        return null;
    }

    return (
        <UserCardContainer
            data-testid={`userCardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={onCardClick}
        >
            {columns.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </UserCardContainer>
    );
};
