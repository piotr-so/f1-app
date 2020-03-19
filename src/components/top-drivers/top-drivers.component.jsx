import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useStateValue } from '../../state/context';
import { useGetData } from '../../modules/hooks';
import { fetchDriverImgsFromCollection } from '../../firebase/firebase.utils';
import { setTopDriversData } from '../../state/actions';

import DriverCard from '../driver-card/driver-card.component';
import { TopDriversWrapper, BackgroundBox, Title, DottedBox, CardsSlider, CardsSliderWrapper } from './top-drivers.styled';

const TopDrivers = forwardRef(({ elementVisibility, id }, ref) => {

    let history = useHistory();
    let location = useLocation();

    const [{ drivers, topDriversData }, dispatch] = useStateValue();
    const [setRequestedData] = useGetData();

    const [scaledCardNum, setScaledCardNum] = useState(0);
    const [sliderWrapperProps, setSliderWrapperProps] = useState({
        isDraggable: false,
        startX: 0,
        startY: 0,
        lastTouch: 0
    });
    const SliderPos = useRef();

    const getIntValOf = element => {
        return parseInt(element.replace("translateX(", "").replace("px)", ""), 10);
    };

    const handleTouchStart = (e) => {

        const currentSliderOffset = getIntValOf(SliderPos.current.style.transform);
        const lastTouchCoordX = e.touches[0].clientX;
        const startY = e.touches[0].clientY;

        setSliderWrapperProps(prevState => ({
            ...prevState,
            startX: currentSliderOffset,
            lastTouch: lastTouchCoordX,
            startY: startY
        }))
    };

    const handleTouchMove = (event) => {

        if (Math.abs(event.touches[0].clientX - sliderWrapperProps.lastTouch) > 20) {
            setSliderWrapperProps(prevState => ({
                ...prevState,
                isDraggable: true
            }))
        }
        if (sliderWrapperProps.isDraggable) {
            switchScaledCard();

            const translateValue = event.touches[0].clientX - sliderWrapperProps.lastTouch;

            const currentSliderOffset = getIntValOf(SliderPos.current.style.transform);

            if (sliderWrapperProps.startX + translateValue !== currentSliderOffset) {
                let newValue = (sliderWrapperProps.startX + translateValue);

                if (newValue > 0) {
                    newValue = 0;
                }
                else if (-window.innerWidth + newValue < -SliderPos.current.getBoundingClientRect().width) {
                    newValue = -SliderPos.current.getBoundingClientRect().width + window.width
                }
                SliderPos.current.style.transform = `translateX(${newValue}px)`
            }
        }
    };

    const handleTouchEnd = () => {
        setSliderWrapperProps(prevState => ({
            ...prevState,
            isDraggable: false
        }))
    };

    const switchScaledCard = () => {
        const currentSliderOffset = getIntValOf(SliderPos.current.style.transform);

        if (currentSliderOffset > -50) {
            return setScaledCardNum(0);
        }
        else if (currentSliderOffset <= -50 && currentSliderOffset > -290) {
            return setScaledCardNum(1);
        }
        else if (currentSliderOffset <= -290 && currentSliderOffset > -490) {
            return setScaledCardNum(2);
        }
        else if (currentSliderOffset <= -490 && currentSliderOffset > -730) {
            return setScaledCardNum(3);
        }
        else if (currentSliderOffset <= -730) {
            return setScaledCardNum(4);
        }
    };

    const handleDriverCardClick = (driverId) => {
        document.body.style.overflow = 'hidden';
        history.push(`${location.pathname}/drivers/${driverId}`);
    };

    const selectTopDriversData = useCallback(
        async () => {
            const topDrivers = drivers.slice(0, 5);
            const topDriverNamesToFetchImgs = topDrivers.map(driverItem => {
                return driverItem.Driver.driverId;
            });

            let driverImgsList = await fetchDriverImgsFromCollection(topDriverNamesToFetchImgs);

            const combineTopDriversDataWithImgs = (driverImgsList) => {

                let combined = [];
                combined = topDrivers;

                combined.forEach(driverItem => driverItem.Driver.imageUrl = driverImgsList[driverItem.Driver.driverId]);
                return combined;
            };

            const combinedData = combineTopDriversDataWithImgs(driverImgsList);

            dispatch(
                setTopDriversData(combinedData)
            );

        },
        [drivers, dispatch]
    );

    useEffect(
        () => {
            if (drivers.length === 0) setRequestedData('drivers-data');
            if (drivers.length > 0) selectTopDriversData();
        },
        [drivers.length, selectTopDriversData, setRequestedData]
    );

    return (
        <TopDriversWrapper>
            <BackgroundBox reveal={elementVisibility && topDriversData.length > 0} ref={ref} id={id}>
                <Title>Top 5 drivers</Title>
                <CardsSlider>
                    <CardsSliderWrapper
                        onTouchStart={(e) => handleTouchStart(e)}
                        onTouchMove={(e) => handleTouchMove(e)}
                        onTouchEnd={handleTouchEnd}
                        ref={SliderPos}
                        style={{ 'transform': `translateX(${0}px)` }}
                    >
                        {topDriversData.length > 0 && topDriversData.map((item, idx) =>
                            <DriverCard
                                key={`card-${idx}`}
                                driverId={item.Driver.driverId}
                                onClickFn={handleDriverCardClick}
                                scaled={scaledCardNum !== idx}
                                fixPosition={idx > 0 && true}
                                position={item.position}
                                name={item.Driver.familyName}
                                points={item.points}
                                constructorTeam={item.Constructors[0].name}
                                teamBackgroundTheme={item.Constructors[0].constructorId}
                                img={item.Driver.imageUrl}
                            />
                        )}
                    </CardsSliderWrapper>
                </CardsSlider>
            </BackgroundBox>
            <DottedBox />
        </TopDriversWrapper>
    );
});

export default TopDrivers;