import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import { useStateValue } from '../../state/context';
import { useGetData } from '../../modules/hooks';

import { fetchDriverOverviewImgFromCollection } from '../../firebase/firebase.utils'

import Header from '../header/header.component';
import Button from '../button/button.component';
import {
    StyledDriverOverviewModal, ModalWrapper, ContentWrapper, DriverBackground, DriverPosition,
    DriverDescriptionWrapper, NameAndTeamWrapper, Name, Team, InfographicsWrapper,
    InfographicElem, Points, RaceWins, PolePositionsNum, Description, PersonalInfoWrapper,
    InfoElem, DriverLastResultWrapper, CheckeredFlag, LastResultInfo, TrackImg, Info,
    InfographicsLabel, DetailedInfo
} from './driver-overview-modal.styled';
import DriverPlaceholderImg from '../../assets/imgs/driver_placeholder.png';

const DriverOverviewModal = ({ type }) => {
    let location = useLocation();

    const [isUnmounting, setIsUnmounting] = useState(false);
    const [basicData, setBasicData] = useState(null);
    const [detailedData, setDetailedData] = useState(null);

    const [{ drivers }] = useStateValue();
    const [setRequestedData] = useGetData();

    const fetchDetailedData = useCallback(
        async () => {
            const driverId = `${location.pathname.split('/')[3]}`;
            let lastRaceResultResponse = await axios.get(`https://ergast.com/api/f1/2019/last/drivers/${driverId}/results.json`);
            let seasonPolesNumResponse = await axios.get(`https://ergast.com/api/f1/2019/drivers/${driverId}/grid/1/qualifying.json`);

            const lastRaceEventInfo = lastRaceResultResponse.data.MRData.RaceTable.Races[0];
            const lastRaceResult = lastRaceResultResponse.data.MRData.RaceTable.Races[0].Results[0];
            const seasonPolesNum = seasonPolesNumResponse.data.MRData.total;
            const filteredDriverDataFromStore = (
                drivers.filter(driverItem => {
                    return driverItem.Driver.driverId === driverId
                })
            );
            const driverAge = dayjs().diff(`${filteredDriverDataFromStore[0].Driver.dateOfBirth}`, 'years');

            const combinedDriverOverviewData = {
                driverAge: driverAge,
                lastResult: {
                    season: lastRaceEventInfo.season,
                    raceName: lastRaceEventInfo.raceName,
                    position: lastRaceResult.position,
                    points: lastRaceResult.points
                },
                totalPolesNumInSeason: seasonPolesNum,
                ...filteredDriverDataFromStore[0],
            };
            setDetailedData({ ...combinedDriverOverviewData });
        },
        [drivers, location.pathname]
    );

    const fetchBasicData = useCallback(
        async () => {
            const driverId = `${location.pathname.split('/')[3]}`;
            let imgUrl = await fetchDriverOverviewImgFromCollection(driverId);
            const filteredDriverDataFromStore = (
                drivers.filter(driverItem => {
                    return driverItem.Driver.driverId === driverId
                })
            );

            const data = filteredDriverDataFromStore[0];
            setBasicData({
                driverImgUrl: imgUrl,
                name: data.Driver.givenName,
                lastName: data.Driver.familyName,
                position: data.position,
                teamId: data.Constructors[data.Constructors.length - 1].constructorId,
                teamName: data.Constructors[data.Constructors.length - 1].name
            });
        },
        [location.pathname, drivers]
    );

    useEffect(
        () => {
            if (drivers.length > 0 && basicData === null && detailedData === null) {
                fetchBasicData();
                fetchDetailedData();
            }
        },
        [fetchDetailedData, fetchBasicData, drivers.length, basicData, detailedData]
    );

    useEffect(
        () => {
            if (drivers.length) {
                setRequestedData('drivers-data');
            }
            return () => document.body.style.overflow = '';
        },
        [drivers.length, setRequestedData]
    );

    return (
        <StyledDriverOverviewModal type={type}>
            <ModalWrapper
                type={type}
                isUnmounting={isUnmounting}
            >
                <Header
                    type={'driver-overview'}
                    unmountFn={setIsUnmounting}
                />
                <ContentWrapper type={type}>
                    <DriverBackground
                        url={basicData && (basicData.driverImgUrl ? basicData.driverImgUrl : DriverPlaceholderImg)}
                        reveal={basicData ? true : false}
                    >
                        <DriverPosition
                            number={basicData && basicData.position}
                            reveal={basicData ? true : undefined}
                        >
                            <div><span>Driver position</span></div>
                        </DriverPosition>
                    </DriverBackground>
                    <DriverDescriptionWrapper>
                        <NameAndTeamWrapper>
                            <Name>
                                {basicData && `${basicData.name} ${basicData.lastName}`}
                            </Name>
                            <Team
                                theme={basicData && basicData.teamId}
                            >
                                {basicData && basicData.teamName}
                            </Team>
                        </NameAndTeamWrapper>
                        <DetailedInfo
                            reveal={detailedData ? true : false}
                        >
                            <InfographicsWrapper>
                                <InfographicsLabel>Season {detailedData && detailedData.lastResult.season}</InfographicsLabel>
                                <InfographicElem>
                                    <Points />
                                    <Description>
                                        <span>{detailedData && detailedData.points}</span>
                                        <span>POINTS</span>
                                    </Description>
                                </InfographicElem>
                                <InfographicElem>
                                    <RaceWins />
                                    <Description>
                                        <span>{detailedData && detailedData.wins}</span>
                                        <span>WINS</span>
                                    </Description>
                                </InfographicElem>
                                <InfographicElem>
                                    <PolePositionsNum />
                                    <Description>
                                        <span>{detailedData && detailedData.totalPolesNumInSeason}</span>
                                        <span>POLES</span>
                                    </Description>
                                </InfographicElem>
                            </InfographicsWrapper>
                            <PersonalInfoWrapper>
                                <InfoElem>
                                    <span>Age</span>
                                    <span>{detailedData && detailedData.driverAge}</span>
                                </InfoElem>
                                <InfoElem>
                                    <span>Nationality</span>
                                    <span>{detailedData && detailedData.Driver.nationality}</span>
                                </InfoElem>
                                <InfoElem>
                                    <span>Driver number</span>
                                    <span>{detailedData && detailedData.Driver.permanentNumber}</span>
                                </InfoElem>
                                <Button>Buy official gadgets</Button>
                            </PersonalInfoWrapper>
                        </DetailedInfo>
                    </DriverDescriptionWrapper>
                    <DriverLastResultWrapper
                        reveal={detailedData ? true : false}
                    >
                        <CheckeredFlag />
                        <LastResultInfo>
                            <TrackImg />
                            <Info>
                                <span>LAST RESULT</span>
                                <p>
                                    {detailedData && detailedData.Driver.givenName} finished in {detailedData && detailedData.lastResult.position}. place and
                                    gained {detailedData && detailedData.lastResult.points} point{detailedData && detailedData.lastResult.points === '1' ? null : 's'} during {detailedData && detailedData.lastResult.season} {detailedData && detailedData.lastResult.raceName}.
                                </p>
                            </Info>
                        </LastResultInfo>
                    </DriverLastResultWrapper>
                </ContentWrapper>
            </ModalWrapper>
        </StyledDriverOverviewModal>
    )
};

export default DriverOverviewModal;