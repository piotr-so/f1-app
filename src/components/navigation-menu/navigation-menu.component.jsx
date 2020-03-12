import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NavigationWrapper, Button, ButtonContentWrapper, HomeImg, DriversImg, TeamsImg, Desc } from './navigation-menu.styled';

const NavigationMenu = () => {
    const navButtonsDesc = [["Home", "/"], ["Drivers", "/driver-standings"], ["Teams", "/constructor-standings"]];
    const history = useHistory();
    const location = useLocation();

    const { pathname } = location;

    const setRenderedImgComponent = (idx) => {
        if (idx === 0) return <HomeImg isactive={pathname === '/' ? "true" : undefined} />;
        if (idx === 1) return <DriversImg isactive={pathname === '/driver-standings' ? "true" : undefined} />;
        if (idx === 2) return <TeamsImg isactive={pathname === '/constructor-standings' ? "true" : undefined} />;
    };

    const handleNavButtonClick = (destinationLocation) => {
        history.push(destinationLocation);
    }

    return (
        <NavigationWrapper>
            {navButtonsDesc.map((buttonElem, idx) => (
                <Button
                    key={buttonElem[0] + idx}
                    isactive={pathname === buttonElem[1] ? "true" : undefined}
                    onClick={() => handleNavButtonClick(buttonElem[1])}
                >
                    <ButtonContentWrapper isactive={pathname === buttonElem[1] ? "true" : undefined}>
                        {setRenderedImgComponent(idx)}
                        <Desc isactive={pathname === buttonElem[1] ? "true" : undefined}>
                            {buttonElem[0]}
                        </Desc>
                    </ButtonContentWrapper>
                </Button>
            ))}
        </NavigationWrapper>
    )
};

export default NavigationMenu;