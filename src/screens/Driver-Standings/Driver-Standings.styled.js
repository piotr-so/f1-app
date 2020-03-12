import styled, { css } from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

export const DriverStandingsWrapper = styled.div`
    position: relative;
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: bold;
    color: ${FontColors.driverStandingsTitle};
    padding: 24px 0 0 24px;
    margin: 0;
`;

export const DriverBarsContainer = styled.div`
    margin: 16px 32px 92px 40px;
`;

const dotsScheme = css`
    position: absolute;
    background: radial-gradient(${BackgroundColors.main} 20%, rgba(0,0,0,0) 25%);
    background-size: 15px 15px;
`;

export const DottedNetBg1 = styled.div`
    ${dotsScheme}
    width: 41%;
    height: 344px;
    top: 8px;
    right: 5px;
`;
export const DottedNetBg2 = styled.div`
    ${dotsScheme}
    width: 80%;
    height: 296px;
    top: 768px;
    left: 5px;
`;
export const DottedNetBg3 = styled.div`
    ${dotsScheme}
    width: 66%;
    height: 303px;
    bottom: 42px;
    right: 5px;
`;