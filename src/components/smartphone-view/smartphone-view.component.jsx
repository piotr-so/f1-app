import React, { useState, useEffect } from 'react';
import { useLocation, Route } from 'react-router-dom';

import DriverOverviewModal from '../driver-overview-modal/driver-overview-modal.component';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.component';

import { SmartphoneViewModal, Info, SmartphoneViewInfoBox, SmartphoneViewWrapper, SmartphoneWrapper, InnerScreen, OuterScreen, TopScreenCover, ModalUnderlay, MouseScrollIndicator, NavigationAnchor } from './smartphone-view.styled';

const SmartphoneView = ({ children }) => {
    let location = useLocation();
    const [isScrollable, setIsScrollable] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const { pathname } = location;

    const handleButtonClick = () => {
        setIsModalVisible(false);
        window.sessionStorage.setItem('InfoUnderstood', 'true');
    };

    useEffect(
        () => {
            const filteredPathname = pathname.split('/')[2];
            if (filteredPathname === 'drivers') {
                setIsScrollable(false);
            }
            else setIsScrollable(true);
        },
        [pathname]
    );

    useEffect(
        () => {
            const infoAccepted = window.sessionStorage.getItem('InfoUnderstood');
            if (infoAccepted) setIsModalVisible(false);
        },
        []
    );

    return (
        <>
            {isModalVisible &&
                <SmartphoneViewModal>
                    <Info>
                        <span>F1 Application</span>
                        <p>
                            This web-view is a simulation of how app behaves on mobile device.<br />
                            <br />
                            Contexts of elements and some components logic are different in this environment for the purpose of proper interactions.<br />
                            <br />

                            <u>Viewing this app on mobile device is highly recommended.<br /></u>
                            <br />
                            For native-like experience, please add F1 Application<br />
                            to Home screen and launch it.
                    </p>
                        <button onClick={handleButtonClick}>I understand</button>
                    </Info>
                </SmartphoneViewModal>
            }
            <SmartphoneViewWrapper>
                <SmartphoneViewInfoBox reveal={!isModalVisible}>
                    <span>F1 Application</span>
                    <p>
                        You are now in simulation mode.<br />
                        <br />
                        Viewing this app on mobile device is highly recommended.<br />
                        <br />
                        For native-like experience,<br />
                        please add F1 Application to Home screen and launch it.
                    </p>
                </SmartphoneViewInfoBox>
                <SmartphoneWrapper>
                    <TopScreenCover />
                    <OuterScreen>
                        <Route path="/:any/drivers/:driverId">
                            <ModalUnderlay>
                                <DriverOverviewModal type={'smartphone-view'} />
                            </ModalUnderlay>
                        </Route>
                        <InnerScreen isScrollable={isScrollable}>
                            {children}
                        </InnerScreen>
                        <NavigationAnchor>
                            <NavigationMenu type={'smartphone-view'} />
                        </NavigationAnchor>
                    </OuterScreen>
                </SmartphoneWrapper>
                <MouseScrollIndicator />
            </SmartphoneViewWrapper>
        </>
    )
};

export default SmartphoneView;