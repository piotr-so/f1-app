import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { fetchDriverImgsFromCollection } from '../../firebase/firebase.utils';
import DriverCard from '../driver-card/driver-card.component';
import { TopDriversWrapper, BackgroundBox, Title, DottedBox, CardsSlider, CardsSliderWrapper } from './top-drivers.styled';

const TopDrivers = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [topDriversImg, setTopDriversImg] = useState([]);
    const [topDrivers, setTopDrivers] = useState([]);
    const [scaledCardNum, setScaledCardNum] = useState(0);
    const [sliderWrapperProps, setSliderWrapperProps] = useState({
        isDraggable: false,
        startX: 0,
        startY: 0,
        lastTouch: 0
    })
    const SliderPos = useRef();

    const getIntValOf = element => {
        return parseInt(element.replace("translateX(", "").replace("px)", ""), 10);
    }

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
    }

    const handleTouchEnd = () => {
        setSliderWrapperProps(prevState => ({
            ...prevState,
            isDraggable: false
        }))
    }

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
    }

    const getData = async () => {
        let res = await axios.get('https://ergast.com/api/f1/2019/driverStandings.json');
        const receivedData = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 5);
        setTopDrivers([...receivedData]);

        const driverNamesToFetchImgs = receivedData.map(driverItem => {
            return driverItem.Driver.driverId;
        })

        let driverImgsList = await fetchDriverImgsFromCollection(driverNamesToFetchImgs);
        setTopDriversImg([driverImgsList]);
        window.localStorage.setItem('TopDriversData', JSON.stringify(receivedData));
        window.localStorage.setItem('TopDriversImgs', JSON.stringify(driverImgsList));
    }

    const replaceWhitespaceInString = (str) => {
        return str.replace(/ /g, "")
    }

    useEffect(() => {
        const TopDriversData = JSON.parse(window.localStorage.getItem('TopDriversData'));
        const TopDriversImgs = JSON.parse(window.localStorage.getItem('TopDriversImgs'));

        if (!TopDriversData && !TopDriversImgs) {
            getData();
        }
        else {
            setTopDrivers([...TopDriversData]);
            setTopDriversImg([TopDriversImgs]);
        }

    }, [])

    useEffect(() => {
        if (topDriversImg.length > 0 && topDrivers.length > 0) {
            setIsLoading(false);
        }
    }, [topDriversImg.length, topDrivers.length])

    return (
        <TopDriversWrapper>
            <BackgroundBox reveal={!isLoading}>
                <Title onClick={() => window.localStorage.clear()}>Top 5 drivers</Title>
                <CardsSlider>
                    <CardsSliderWrapper
                        onTouchStart={(e) => handleTouchStart(e)}
                        onTouchMove={(e) => handleTouchMove(e)}
                        onTouchEnd={handleTouchEnd}
                        ref={SliderPos}
                        style={{ 'transform': `translateX(${0}px)` }}
                    >
                        {topDrivers.length > 0 && topDrivers.map((item, idx) =>
                            <DriverCard
                                key={`card-${idx}`}
                                scaled={scaledCardNum !== idx}
                                fixPosition={idx > 0 && true}
                                position={item.position}
                                name={item.Driver.familyName}
                                points={item.points}
                                constructorTeam={item.Constructors[0].name}
                                teamBackgroundTheme={replaceWhitespaceInString(item.Constructors[0].name.toLowerCase())}
                                img={topDriversImg.length > 0 ? topDriversImg[0][item.Driver.driverId] : 'emptyLoading'}
                            />
                        )}
                    </CardsSliderWrapper>
                </CardsSlider>
            </BackgroundBox>
            <DottedBox />
        </TopDriversWrapper>
    );
}

export default TopDrivers;