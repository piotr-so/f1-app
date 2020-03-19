import React from 'react';
import { useHistory } from 'react-router-dom';

import { HeaderWrapper, Logo, ArrowContainer, ArrowBack, Title } from './header.styled';

const Header = ({ unmountFn, type }) => {
    let history = useHistory();

    const handleClick = () => {
        unmountFn(true);
        setTimeout(() => history.goBack(), 400);
    };

    return (
        <HeaderWrapper
            headerType={type}
        >
            {type === 'app-header' ?
                <Logo />
                :
                <>
                    <ArrowContainer onClick={() => handleClick()}>
                        <ArrowBack />
                    </ArrowContainer>
                    <Title>Driver</Title>
                </>
            }
        </HeaderWrapper>
    );
}

export default Header;
