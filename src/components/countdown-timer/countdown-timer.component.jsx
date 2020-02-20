import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

import { BoxWrapper, Element, Number, Description, Separator } from './countdown-timer.styled';

const CountdownTimer = ({ eventDate }) => {

    const [countdown, setCountdown] = useState({
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    });

    const countTimeLeft = useCallback(() => {
        const presentDate = moment();
        const timeLeftToEvent = moment(eventDate - presentDate);

        const days = timeLeftToEvent.format('D');
        const hours = timeLeftToEvent.format('HH');
        const minutes = timeLeftToEvent.format('mm');
        const seconds = timeLeftToEvent.format('ss');

        setCountdown({ days, hours, minutes, seconds });
    }, [eventDate])

    useEffect(() => {
        if (eventDate) countTimeLeft();
        const countdownInterval = setInterval(() => {
            countTimeLeft();
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [eventDate, countTimeLeft]);

    return (
        <BoxWrapper>
            <Element>
                <Number>{countdown.days}</Number>
                <Description>DAYS</Description>
            </Element>
            <Separator>:</Separator>
            <Element>
                <Number>{countdown.hours}</Number>
                <Description>HOURS</Description>
            </Element>
            <Separator>:</Separator>
            <Element>
                <Number>{countdown.minutes}</Number>
                <Description>MIN</Description>
            </Element>
            <Separator>:</Separator>
            <Element>
                <Number>{countdown.seconds}</Number>
                <Description>SEC</Description>
            </Element>
        </BoxWrapper>
    );
}

export default CountdownTimer;