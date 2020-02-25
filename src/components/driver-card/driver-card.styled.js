import styled, { css } from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 224px;
    height: 312px;
    color: ${FontColors.driverCard};
    background: transparent linear-gradient(203deg, #FFFFFF 0%, #DFF6F4 28%, #00D2BE 100%) 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 6px #00000029;
    border: 1px solid #9D9797;
    border-radius: 10px;
    margin-right: 20px;
    ${props => props.scaled && css`
        transform: scale(0.9) translateY(18px);
    `};
    transition: transform .5s;
`;
export const DriverInfo = styled.div`
    display: flex;
`;
export const DriverNumber = styled.div`
    font-size: 100px;
    font-weight: bold;
    padding-top: 13px;
    opacity: 0.42;
`;
export const DriverDescription = styled.div`
    font-weight: bold;
`;
export const Name = styled.div`
    font-size: 20px;
    padding-top: 29px;
`;
export const Team = styled.div`
    font-size: 16px;
    margin: 8px 0;
`;
export const Points = styled.div`
    text-align: center;
    font-size: 16px;
    color: ${FontColors.secondary};
    background-color: ${BackgroundColors.driverCard};
    border-radius: 5px;
`;
export const DriverImg = styled.img`
    margin: 0 auto;
`;