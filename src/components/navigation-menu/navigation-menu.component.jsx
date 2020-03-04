import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavigationWrapper, Button, ButtonContentWrapper, HomeImg, DriversImg, TeamsImg, Desc } from './navigation-menu.styled';

const NavigationMenu = () => {
    const [isActive, setIsActive] = useState(0);
    const navButtonsDesc = [["Home", "/"], ["Drivers", "/driver-standings"], ["Teams", "/constructor-standings"]];
    const history = useHistory();

    const setRenderedImgComponent = (idx) => {
        if (idx === 0) return <HomeImg isactive={isActive === idx} />;
        if (idx === 1) return <DriversImg isactive={isActive === idx} />;
        if (idx === 2) return <TeamsImg isactive={isActive === idx} />;
    };

    const handleNavButtonClick = (idx, location) => {
        setIsActive(idx);
        history.push(location);
    }

    return (
        <NavigationWrapper>
            {navButtonsDesc.map((buttonElem, idx) => (
                <Button
                    isactive={isActive === idx}
                    onClick={() => handleNavButtonClick(idx, buttonElem[1])}
                >
                    <ButtonContentWrapper isactive={isActive === idx}>
                        {setRenderedImgComponent(idx)}
                        <Desc isactive={isActive === idx}>
                            {buttonElem[0]}
                        </Desc>
                    </ButtonContentWrapper>
                </Button>
            ))}
        </NavigationWrapper>
    )
};

export default NavigationMenu;