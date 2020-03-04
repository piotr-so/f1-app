import React, { useState } from 'react';
import { NavigationWrapper, Button, ButtonContentWrapper, HomeImg, DriversImg, TeamsImg, Desc } from './navigation-menu.styled';

const NavigationMenu = () => {
    const [isActive, setIsActive] = useState(0);
    const navButtonsDesc = ["Home", "Drivers", "Teams"];

    const setRenderedImgComponent = (idx) => {
        if (idx === 0) return <HomeImg isactive={isActive === idx}/>;
        if (idx === 1) return <DriversImg isactive={isActive === idx}/>;
        if (idx === 2) return <TeamsImg isactive={isActive === idx}/>;
    };

    return (
        <NavigationWrapper>
            {navButtonsDesc.map((buttonElem, idx) => (
                <Button
                    isactive={isActive === idx}
                    onClick={() => setIsActive(idx)}
                >
                    <ButtonContentWrapper isactive={isActive === idx}>
                        {setRenderedImgComponent(idx)}
                        <Desc isactive={isActive === idx}>
                            {buttonElem}
                        </Desc>
                    </ButtonContentWrapper>
                </Button>
            ))}
        </NavigationWrapper>
    )
};

export default NavigationMenu;