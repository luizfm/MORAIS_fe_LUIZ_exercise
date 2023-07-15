import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const navigate = useNavigate();

    const onBackButtonClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <HeaderContainer>
            <NavigationHeader>
                {showBackButton && <BackButton onClick={onBackButtonClick}>🔙</BackButton>}
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
