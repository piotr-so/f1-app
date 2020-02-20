import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import CountdownTimer from '../countdown-timer/countdown-timer.component';

import { SectionWrapper, RaceInfoBox, CheckeredFlag, ElementsWrapper, TrackImg } from './next-race-info.styled';
import TrackImgSrc from '../../assets/imgs/race-japan.svg';

const NextRace = () => {

    const [nextRaceEvent, setNextRaceEvent] = useState(null);

    useEffect(() => {
        axios
            .get('https://ergast.com/api/f1/2020/next.json')
            .then(
                result => {
                    const receivedData = result.data.MRData.RaceTable.Races[0];
                    const { raceName, date, time } = receivedData;
                    const eventDate = moment(`${date} ${time}`);

                    setNextRaceEvent({
                        raceName: raceName,
                        eventDate: eventDate
                    });
                }
            )
            .catch(error => console.log(error));
    }, []);

    return (
        <SectionWrapper>
            <RaceInfoBox reveal={nextRaceEvent}>
                <CheckeredFlag />
                <ElementsWrapper>
                    <span>Next</span>
                    <span>{nextRaceEvent && nextRaceEvent.raceName}</span>
                    <TrackImg src={TrackImgSrc} />
                </ElementsWrapper>
                <CountdownTimer eventDate={nextRaceEvent && nextRaceEvent.eventDate} />
            </RaceInfoBox>
        </SectionWrapper>
    );
}

export default NextRace;