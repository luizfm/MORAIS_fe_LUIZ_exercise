import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Container} from './styles';

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
    const navigate = useNavigate();

    const onCardClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (hasNavigation) {
                navigate(url, {
                    state: navigationProps,
                });
            }
            trackEvent?.();
            event.preventDefault();
        },
        [hasNavigation, navigate, navigationProps, url, trackEvent]
    );

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={onCardClick}
        >
            {columns.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
