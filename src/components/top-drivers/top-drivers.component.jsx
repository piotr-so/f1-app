import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useStateValue } from '../../state/context';
import { useGetData } from '../../modules/hooks';
import { fetchDriverImgsFromCollection } from '../../firebase/firebase.utils';
import { setTopDriversData } from '../../state/actions';

import DriverCard from '../driver-card/driver-card.component';
import { TopDriversWrapper, BackgroundBox, Title, DottedBox, Carousel, CarouselTrack } from './top-drivers.styled';

const TopDrivers = forwardRef(({ elementVisibility, id }, ref) => {

    let history = useHistory();
    let location = useLocation();

    const [{ drivers, topDriversData }, dispatch] = useStateValue();
    const [setRequestedData] = useGetData();

    const [scaledCardNum, setScaledCardNum] = useState(0);
    const [carouselProps, setCarouselProps] = useState({
        moving: false,
        startX: null,
        translatedAmount: 0,
    });
    const CarouselRef = useRef();

    const [preventClick, setPreventClick] = useState(false);

    const handleGestureDown = (e) => {
        e.persist();
        const transformMatrix = window.getComputedStyle(CarouselRef.current).getPropertyValue('transform');
        let newTranslatedAmount;

        if (transformMatrix !== 'none') {
            newTranslatedAmount = parseInt(transformMatrix.split(',')[4].trim());
        };

        let newStartX;

        // synthetic event touches detection
        if (e.pageX === undefined) newStartX = e.touches[0].clientX;
        else newStartX = e.pageX;

        setCarouselProps(prevState => ({
            ...prevState,
            startX: newStartX,
            translatedAmount: newTranslatedAmount,
            moving: true
        }))
    };
    const handleGestureMove = (e) => {
        const { moving } = carouselProps;
        if (moving) {
            setPreventClick(true);
            switchScaledCard();

            const { startX, translatedAmount } = carouselProps;

            let currentPosition;

            if (e.pageX === undefined) currentPosition = e.touches[0].clientX;
            else currentPosition = e.pageX;

            const diff = currentPosition - startX;
            const speed = 1.25;

            CarouselRef.current.style.transform = `translateX(${(translatedAmount + diff * speed).toFixed(0)}px)`;
        };
    };

    const handleGestureUp = useCallback(
        () => {
            const transformMatrix = window.getComputedStyle(CarouselRef.current).getPropertyValue('transform');
            const translateAmount = parseInt(transformMatrix.split(',')[4].trim());

            let maxTranslateAmount;
            // override window context for "smartphone simulation view"
            if (window.innerWidth > 450) {
                maxTranslateAmount = -(CarouselRef.current.offsetWidth - CarouselRef.current.parentElement.offsetWidth)
            }
            else maxTranslateAmount = -(CarouselRef.current.offsetWidth - window.innerWidth)

            if (translateAmount > 0 || translateAmount < maxTranslateAmount) {
                let newTranslatedAmount;
                if (translateAmount > 0) newTranslatedAmount = 0;
                else newTranslatedAmount = maxTranslateAmount;

                setCarouselProps(prevState => ({
                    ...prevState,
                    translatedAmount: newTranslatedAmount,
                    moving: false
                }))
                CarouselRef.current.style.transform = `translateX(${newTranslatedAmount}px)`;
                CarouselRef.current.style.transition = `transform 0.5s ease-in`;
                setTimeout(() => CarouselRef.current.style.removeProperty('transition'), 600);
            }
            else {
                setCarouselProps(prevState => ({
                    ...prevState,
                    moving: false
                }))
            }
            setPreventClick(false);
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
        const transformMatrix = window.getComputedStyle(CarouselRef.current).getPropertyValue('transform');
        const currentCarouselTrackOffset = parseInt(transformMatrix.split(',')[4].trim());

        if (currentCarouselTrackOffset > -50) {
            return setScaledCardNum(0);
        }
        else if (currentCarouselTrackOffset <= -50 && currentCarouselTrackOffset > -290) {
            return setScaledCardNum(1);
        }
        else if (currentCarouselTrackOffset <= -290 && currentCarouselTrackOffset > -490) {
            return setScaledCardNum(2);
        }
        else if (currentCarouselTrackOffset <= -490 && currentCarouselTrackOffset > -730) {
            return setScaledCardNum(3);
        }
        else if (currentCarouselTrackOffset <= -730) {
            return setScaledCardNum(4);
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
            window.addEventListener('mouseup', handleGestureUp);
            return () => window.removeEventListener('mouseup', handleGestureUp);
        },
        [handleGestureUp]
    );

    return (
        <TopDriversWrapper>
            <BackgroundBox reveal={elementVisibility && topDriversData.length > 0} ref={ref} id={id}>
                <Title>Top 5 drivers</Title>
                <Carousel>
                    <CarouselTrack
                        onTouchStart={(e) => handleGestureDown(e)}
                        onTouchMove={(e) => handleGestureMove(e)}
                        onTouchEnd={handleGestureUp}
                        onMouseDown={(e) => handleGestureDown(e)}
                        onMouseMove={(e) => handleGestureMove(e)}

                        ref={CarouselRef}
                        style={{ 'transform': `translateX(${0}px)` }}
                    >
                        {topDriversData.length > 0 && topDriversData.map((item, idx) =>
                            <DriverCard
                                key={`card-${idx}`}
                                driverId={item.Driver.driverId}
                                onMouseUpFn={handleDriverCardMouseUp}
                                isCarouselMoving={carouselProps.moving}
                                scaled={scaledCardNum !== idx}
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