import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { NavigationWrapper, Button, ButtonContentWrapper, HomeImg, DriversImg, TeamsImg, Desc } from './navigation-menu.styled';

const NavigationMenu = ({type}) => {
    const navButtonsDesc = [["Home", "/home"], ["Drivers", "/driver-standings"], ["Teams", "/constructor-standings"]];
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;

    const [mainPath, setMainPath] = useState();

    const setRenderedImgComponent = (idx) => {
        if (idx === 0) return <HomeImg isactive={mainPath === '/home' ? "true" : undefined} />;
        if (idx === 1) return <DriversImg isactive={mainPath === '/driver-standings' ? "true" : undefined} />;
        if (idx === 2) return <TeamsImg isactive={mainPath === '/constructor-standings' ? "true" : undefined} />;
    };

    const handleNavButtonClick = (destinationLocation) => {
        history.push(destinationLocation);
    };

    // slicing pathname to mainpath variable, to preserve navigation button styles on route change (during slideOut animation)
    useEffect(
        () => {
            setMainPath(`/${pathname.split('/')[1]}`);
        },
        [pathname]
    );

    return (
        <NavigationWrapper
            type={type}
            visible={
                pathname === navButtonsDesc[0][1] ||
                pathname === navButtonsDesc[1][1] ||
                pathname === navButtonsDesc[2][1]
                ? true
                : false
            }
        >
            {navButtonsDesc.map((buttonElem, idx) => (
                <Button
                    key={buttonElem[0] + idx}
                    isactive={mainPath === buttonElem[1] ? true : false}
                    onClick={() => handleNavButtonClick(buttonElem[1])}
                >
                    <ButtonContentWrapper isactive={mainPath === buttonElem[1] ? true : false}>
                        {setRenderedImgComponent(idx)}
                        <Desc isactive={mainPath === buttonElem[1] ? true : false}>
                            {buttonElem[0]}
                        </Desc>
                    </ButtonContentWrapper>
                </Button>
            ))}
        </NavigationWrapper>
    )
};

export default NavigationMenu;