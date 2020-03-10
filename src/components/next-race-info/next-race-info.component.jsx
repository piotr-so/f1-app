import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';

import { useStateValue } from '../../state/context';
import { setNextRaceEvent } from '../../state/actions';

import { fetchTrackImgFromCollection } from '../../firebase/firebase.utils';

import CountdownTimer from '../countdown-timer/countdown-timer.component';

import { SectionWrapper, RaceInfoBox, CheckeredFlag, ElementsWrapper, TrackImg } from './next-race-info.styled';

const NextRace = () => {

    const [{ nextRaceEvent }, dispatch] = useStateValue();

    const getNextRaceData = useCallback(
        async () => {
            let res = await axios.get('https://ergast.com/api/f1/2020/next.json');
            const { raceName, date, time } = res.data.MRData.RaceTable.Races[0];
            const eventDate = moment(`${date} ${time}`);
            let racetrackImgUrl = await fetchTrackImgFromCollection(raceName);

            dispatch(
                setNextRaceEvent({
                    raceName: raceName,
                    eventDate: eventDate,
                    racetrackImgUrl: racetrackImgUrl
                })
            );
        },
        [dispatch]
    );

    useEffect(
        () => {
            if (nextRaceEvent === null) getNextRaceData();
        },
        [nextRaceEvent, getNextRaceData]
    );

    return (
        <SectionWrapper>
            <RaceInfoBox reveal={nextRaceEvent}>
                <CheckeredFlag />
                <ElementsWrapper>
                    <span>Next</span>
                    <span>{nextRaceEvent && nextRaceEvent.raceName}</span>
                    <TrackImg src={nextRaceEvent && nextRaceEvent.racetrackImgUrl} />
                </ElementsWrapper>
                <CountdownTimer eventDate={nextRaceEvent && nextRaceEvent.eventDate} />
            </RaceInfoBox>
        </SectionWrapper>
    );
}

export default NextRace;