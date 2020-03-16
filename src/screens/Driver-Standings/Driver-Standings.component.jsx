import React, { useEffect, useState, useRef} from 'react';

import { useIO, useGetData } from '../../modules/hooks';
import { useStateValue } from '../../state/context';

import DriverBar from '../../components/driver-bar/driver-bar.component';

import { DriverStandingsWrapper, Title, DriverBarsContainer, DottedNetBg1, DottedNetBg2, DottedNetBg3 } from './Driver-Standings.styled';

const DriverStandings = () => {
    const [{ drivers }] = useStateValue();
    const [visibleElement, setVisibleElements] = useState({
        visibleElemsArr: [],
        visible: 0
    });
    const loadQuantity = 10;

    const lastElementRef = useRef();

    const [observer, setElements, entries] = useIO({ threshold: 1 });
    const [setRequestedData] = useGetData();

    const { visibleElemsArr, visible } = visibleElement;

    useEffect(
        () => {
            window.scrollTo(0,0);
            
            if (drivers.length === 0) {
                setRequestedData('drivers-data');
            }
            else if (drivers.length > 0 && visibleElemsArr.length === 0) {
                setVisibleElements(prevState => ({
                    ...prevState,
                    visibleElemsArr: drivers.slice(0, 10),
                    visible: 10
                }));
            }

            if (visibleElemsArr.length > 0) {
                setElements([lastElementRef.current]);
            }
        },
        [drivers.length, visibleElemsArr.length, setElements, setRequestedData, drivers]
    );

    useEffect(
        () => {
            entries.forEach(entry => {
                if (visible === 20) {
                    observer.unobserve(entry.target);
                    return;
                }
                if (entry.isIntersecting) {
                    const newData = drivers.slice(visible, visible + loadQuantity);

                    setVisibleElements(prevState => ({
                        ...prevState,
                        visibleElemsArr: [...prevState.visibleElemsArr, ...newData],
                        visible: prevState.visible + loadQuantity
                    }));
                    observer.unobserve(entry.target);
                }
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [entries, observer]
    );
    return (
        <DriverStandingsWrapper>
            <DottedNetBg1 />
            {visibleElemsArr.length > 5 && <DottedNetBg2 />}
            {visibleElemsArr.length > 10 && <DottedNetBg3 />}
            <Title>Driver Standings</Title>
            <DriverBarsContainer>
                {visibleElemsArr.length > 0 && visibleElemsArr.map((driverElem, idx) =>
                    <DriverBar
                        key={driverElem.Driver.driverId}
                        driver={driverElem.Driver}
                        points={driverElem.points}
                        position={driverElem.position}
                        theme={driverElem.Constructors[0].constructorId}
                        ref={idx === visibleElemsArr.length - 1 ? lastElementRef : undefined}
                    />
                )}
            </DriverBarsContainer>
        </DriverStandingsWrapper>
    )
}

export default DriverStandings;