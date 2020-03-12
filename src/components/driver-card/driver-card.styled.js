import styled, { css } from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

const { constructorTheme } = BackgroundColors;

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 224px;
    height: 312px;
    color: ${FontColors.driverCard};
    background: ${props => {
        const themeColors = constructorTheme[props.theme];
        return `linear-gradient(25deg, ${themeColors[0]} 0%, ${themeColors[1]} 45%, ${themeColors[2]} 65%)`
    }};
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
    padding-left: ${props => props.fixPosition ? '5px' : undefined};
`;
export const DriverDescription = styled.div`
    font-weight: bold;
    padding-left: ${props => props.fixPosition ? '12px' : undefined};
`;
export const Name = styled.div`
    font-size: 20px;
    padding-top: 29px;
`;
export const Team = styled.div`
    font-size: 16px;
    margin: 8px 0;
`;

export const DriverImg = styled.img`
    margin: 0 auto;
`;