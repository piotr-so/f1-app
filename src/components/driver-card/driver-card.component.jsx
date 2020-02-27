import React from 'react';
import { CardWrapper, DriverInfo, DriverNumber, DriverDescription, Name, Team, Points, DriverImg} from './driver-card.styled';
import driverPlaceholderImg from '../../assets/imgs/driver_placeholder.png';

const DriverCard = ({scaled, position, name, points, constructorTeam, img, teamBackgroundTheme, fixPosition}) => {
    return (
        <CardWrapper scaled={scaled} theme={teamBackgroundTheme}>
            <DriverInfo>
                <DriverNumber fixPosition={fixPosition}>{position}</DriverNumber>
                <DriverDescription fixPosition={fixPosition}>
                    <Name>{name}</Name>
                    <Team>{constructorTeam}</Team>
                    <Points>{points} PTS</Points>
                </DriverDescription>
            </DriverInfo>
            <DriverImg src={img === undefined || img === 'emptyLoading' ? driverPlaceholderImg : img} alt={name}/>
        </CardWrapper>
    );
}

export default DriverCard;