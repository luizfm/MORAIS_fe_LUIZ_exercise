import React, {useCallback} from 'react';
import {Teams, UserData} from 'types';
import {Link} from 'react-router-dom';
import {CardLink, Container} from './styles';

type Columns = {
    key: string;
    value: string;
};
interface Props {
    id?: string;
    url?: string;
    columns: Columns[];
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
    trackEvent?: () => void;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
    trackEvent,
}: Props) => {
    const onCardClick = useCallback(() => {
        trackEvent?.();
    }, [trackEvent]);

    return (
        <Container hasNavigation={hasNavigation}>
            <CardLink
                data-testid={`cardContainer-${id}`}
                to={url}
                onClick={onCardClick}
                state={navigationProps}
            >
                {columns.map(({key: columnKey, value}) => (
                    <p key={columnKey}>
                        <strong>{columnKey}</strong>&nbsp;{value}
                    </p>
                ))}
            </CardLink>
        </Container>
    );
};

export default Card;
