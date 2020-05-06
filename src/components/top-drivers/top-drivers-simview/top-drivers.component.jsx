import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useStateValue } from '../../../state/context';
import { useGetData } from '../../../modules/hooks';
import { fetchDriverImgsFromCollection } from '../../../firebase/firebase.utils';
import { setTopDriversData } from '../../../state/actions';

import DriverCard from '../../driver-card/driver-card.component';
import { TopDriversWrapper, BackgroundBox, Title, DottedBox, Carousel, CarouselTrack } from './top-drivers.styled';

const TopDrivers = forwardRef(({ elementVisibility, id }, ref) => {

    let history = useHistory();
    let location = useLocation();

    const [{ drivers, topDriversData }, dispatch] = useStateValue();
    const [setRequestedData] = useGetData();

    const [carouselProps, setCarouselProps] = useState({
        moving: false,
        startX: null,
        translatedAmount: 0,
    });
    const CarouselTrackRef = useRef();
    let scaledCardNumRef = useRef(0);

    const [preventClick, setPreventClick] = useState(false);

    
    const handleMouseDown = (e) => {
        e.persist();

        const transformMatrix = window.getComputedStyle(CarouselTrackRef.current).getPropertyValue('transform');

        // stopping currently running transition effect when grabbing
        if (CarouselTrackRef.current.style.transition) {
            const translatePosToStopWhenGrabbed = parseInt(transformMatrix.split(',')[4].trim());

            CarouselTrackRef.current.style.transform = `translateX(${translatePosToStopWhenGrabbed}px)`;
            CarouselTrackRef.current.style.removeProperty('transition');
        }

        let newTranslatedAmount;

        if (transformMatrix !== 'none') {
            newTranslatedAmount = parseInt(transformMatrix.split(',')[4].trim());
        };

        const newStartX = e.pageX;

        setCarouselProps(prevState => ({
            ...prevState,
            startX: newStartX,
            translatedAmount: newTranslatedAmount,
            moving: true
        }))
    };

    const handleMouseMove = (e) => {
        const { moving } = carouselProps;
        if (moving) {
            setPreventClick(true);
            switchScaledCard();

            const { startX, translatedAmount } = carouselProps;

            const currentPosition = e.pageX;

            const diff = currentPosition - startX;
            const speed = 1.25;

            CarouselTrackRef.current.style.transform = `translateX(${(translatedAmount + diff * speed).toFixed(0)}px)`;
        };
    };

    const handleMouseUp = useCallback(
        () => {
            setCarouselProps(prevState => ({
                ...prevState,
                moving: false
            }));
            setPreventClick(false);

            const leftPadding = 24
            const cardWidth = 230;
            const gap = 20;
            const breakpoint = cardWidth + gap;


            const snapToCardPos = scaledCardNumRef.current === 0 ? leftPadding : scaledCardNumRef.current * -breakpoint + leftPadding;


            CarouselTrackRef.current.style.transform = `translateX(${snapToCardPos}px)`;
            CarouselTrackRef.current.style.transition = 'transform .5s ease-in';
            setTimeout(
                () => {
                    if (CarouselTrackRef.current) CarouselTrackRef.current.style.removeProperty('transition');
                },
                600
            );
        },
        []
    );

    const handleDriverCardMouseUp = (driverId) => {
        if (preventClick) {
            setPreventClick(false);
            return;
        }
        else {
            document.body.style.overflow = 'hidden';
            history.push(`${location.pathname}/drivers/${driverId}`);
            setPreventClick(false);
        }

    };

    const switchScaledCard = () => {
        const transformMatrix = window.getComputedStyle(CarouselTrackRef.current).getPropertyValue('transform');
        const currentCarouselTrackOffset = parseInt(transformMatrix.split(',')[4].trim());

        const cardWidth = 230;
        const gap = 20;
        // negative values for sim view translation
        const cardMiddle = -115;
        const breakpoint = -(cardWidth + gap);

        if (currentCarouselTrackOffset > cardMiddle) {
            return scaledCardNumRef.current = 0;
        }
        else if (currentCarouselTrackOffset <= cardMiddle && currentCarouselTrackOffset > breakpoint + cardMiddle) {
            return scaledCardNumRef.current = 1;
        }
        else if (currentCarouselTrackOffset <= breakpoint + cardMiddle && currentCarouselTrackOffset > breakpoint * 2 + cardMiddle) {
            return scaledCardNumRef.current = 2;
        }
        else if (currentCarouselTrackOffset <= breakpoint * 2 + cardMiddle && currentCarouselTrackOffset > breakpoint * 3 + cardMiddle) {
            return scaledCardNumRef.current = 3;
        }
        else if (currentCarouselTrackOffset <= breakpoint * 3 + cardMiddle) {
            return scaledCardNumRef.current = 4;
        }
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

    useEffect(
        () => {
            window.addEventListener('mouseup', handleMouseUp);
            return () => window.removeEventListener('mouseup', handleMouseUp);
        },
        [handleMouseUp]
    );

    return (
        <TopDriversWrapper>
            <BackgroundBox reveal={elementVisibility && topDriversData.length > 0} ref={ref} id={id}>
                <Title>Top 5 drivers</Title>
                <Carousel>
                    <CarouselTrack
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseMove={(e) => handleMouseMove(e)}

                        ref={CarouselTrackRef}
                        style={{ 'transform': `translateX(${24}px)` }}
                        isGrabbed={carouselProps.moving}
                    >
                        {topDriversData.length > 0 && topDriversData.map((item, idx) =>
                            <DriverCard
                                key={`card-${idx}`}
                                driverId={item.Driver.driverId}
                                onMouseUpFn={handleDriverCardMouseUp}
                                isGrabbed={carouselProps.moving}
                                scaled={scaledCardNumRef.current !== idx}
                                fixPosition={idx > 0 && true}
                                position={item.position}
                                name={item.Driver.familyName}
                                points={item.points}
                                constructorTeam={item.Constructors[item.Constructors.length - 1].name}
                                teamBackgroundTheme={item.Constructors[item.Constructors.length - 1].constructorId}
                                img={item.Driver.imageUrl}
                            />
                        )}
                    </CarouselTrack>
                </Carousel>
            </BackgroundBox>
            <DottedBox reveal={elementVisibility && topDriversData.length > 0} />
        </TopDriversWrapper>
    );
});

export default TopDrivers;