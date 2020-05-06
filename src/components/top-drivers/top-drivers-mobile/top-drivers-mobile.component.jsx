import React, { useState, useRef, useEffect, forwardRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useStateValue } from '../../../state/context';
import { useGetData } from '../../../modules/hooks';
import { fetchDriverImgsFromCollection } from '../../../firebase/firebase.utils';
import { setTopDriversData } from '../../../state/actions';

import DriverCard from '../../driver-card/driver-card.component';
import { TopDriversWrapper, BackgroundBox, Title, DottedBox, Carousel, CarouselTrack } from './top-drivers-mobile-styled';

const TopDrivers = forwardRef(({ elementVisibility, id }, ref) => {

    let history = useHistory();
    let location = useLocation();

    const [{ drivers, topDriversData }, dispatch] = useStateValue();
    const [setRequestedData] = useGetData();

    const [scaledCardNum, setScaledCardNum] = useState(0);
    const CarouselRef = useRef();


    const [preventClick, setPreventClick] = useState(false);


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

    const switchScaledCardNumOnScroll = () => {
        const carouselOffset = CarouselRef.current.scrollLeft;
        const cardWidth = 230;
        const gap = 20;
        const cardMiddle = 115;
        const breakpoint = cardWidth + gap;

        if (carouselOffset <= breakpoint + cardMiddle) {
            return setScaledCardNum(0);
        }
        else if (carouselOffset > breakpoint + cardMiddle && carouselOffset <= breakpoint * 2 + cardMiddle) {
            return setScaledCardNum(1);
        }
        else if (carouselOffset > breakpoint * 2 + cardMiddle && carouselOffset <= breakpoint * 3 + cardMiddle) {
            return setScaledCardNum(2);
        }
        else if (carouselOffset > breakpoint * 3 + cardMiddle && carouselOffset <= breakpoint * 4 + cardMiddle) {
            return setScaledCardNum(3);
        }
        else if (carouselOffset > breakpoint * 4 + cardMiddle) {
            return setScaledCardNum(4);
        }
    }

    const throttle = (callback, limit) => {
        let wait = false;
        return () => {
            if (!wait) {
                callback();
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, limit);
            }
        }
    }

    useEffect(
        () => {
            if (drivers.length === 0) setRequestedData('drivers-data');
            if (drivers.length > 0) selectTopDriversData();
        },
        [drivers.length, selectTopDriversData, setRequestedData]
    );

    useEffect(
        () => {
            const carouselElem = CarouselRef.current;
            carouselElem.scrollLeft = 230;
            carouselElem.addEventListener('scroll', throttle(switchScaledCardNumOnScroll, 50));
            return () => carouselElem.removeEventListener('scroll', throttle(switchScaledCardNumOnScroll, 50));
        },
        []
    );

    return (
        <TopDriversWrapper>
            <BackgroundBox reveal={elementVisibility && topDriversData.length > 0} ref={ref} id={id}>
                <Title>Top 5 drivers</Title>
                <Carousel ref={CarouselRef}>
                    <CarouselTrack>
                        {topDriversData.length > 0 && topDriversData.map((item, idx) =>
                            <DriverCard
                                key={`card-${idx}`}
                                driverId={item.Driver.driverId}
                                onMouseUpFn={handleDriverCardMouseUp}
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