import React, { useState, useRef} from 'react';
import DriverCard from '../driver-card/driver-card.component';
import { TopDriversWrapper, BackgroundBox, Title, DottedBox, CardsSlider, CardsSliderWrapper } from './top-drivers.styled';

const TopDrivers = () => {

    const [scaledCardNum, setScaledCardNum] = useState(0);
    const [sliderWrapperProps, setSliderWrapperProps] = useState({
        isDraggable: false,
        startX: 0,
        startY: 0,
        lastTouch: 0
    })
    const TopDriversNum = [...Array(5)].map(x => 0);
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


    const toucheMoveHandler = (event) => {

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


    return (
        <TopDriversWrapper>
            <BackgroundBox>
                <Title>Top 5 drivers</Title>
                <CardsSlider>
                    <CardsSliderWrapper
                        onTouchStart={(e) => handleTouchStart(e)}
                        onTouchMove={(e) => toucheMoveHandler(e)}
                        onTouchEnd={handleTouchEnd}
                        ref={SliderPos}
                        style={{ 'transform': `translateX(${0}px)` }}
                    >
                        {TopDriversNum.map((item, idx) =>
                            <DriverCard
                                key={`card-${idx}`}
                                scaled={scaledCardNum !== idx}
                            />
                        )}
                    </CardsSliderWrapper>
                </CardsSlider>
            </BackgroundBox>
            <DottedBox />
            <DottedBox />
            <DottedBox />
            <DottedBox />
            <DottedBox />
            <DottedBox />
            <DottedBox />
            <DottedBox />
        </TopDriversWrapper>
    );
}

export default TopDrivers;