import React from 'react';
import { CardWrapper, DriverInfo, DriverNumber, DriverDescription, Name, Team, Points, DriverImg} from './driver-card.styled';
import HamiltonImg from '../../assets/drivers/hamilton-minified.png';


const DriverCard = (props) => {
    return (
        <CardWrapper {...props}>
            <DriverInfo>
                <DriverNumber>1</DriverNumber>
                <DriverDescription>
                    <Name>Lewis</Name>
                    <Team>Mercedes</Team>
                    <Points>322 PTS</Points>
                </DriverDescription>
            </DriverInfo>
            <DriverImg src={HamiltonImg} alt={`hamilton`}/>
        </CardWrapper>
    );
}

export default DriverCard;