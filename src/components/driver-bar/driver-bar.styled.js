import styled from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';
import { revealAnimation } from '../../modules/animations.styled';

const { constructorTheme } = BackgroundColors;

export const DriverBarWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-bottom: 24px;
    font-weight: bold;
    background: ${props => {
        const themeColors = constructorTheme[props.theme];
        return `linear-gradient(25deg, ${themeColors[0]} 0%, ${themeColors[1]} 35%, ${themeColors[2]} 45%)`
    }};
    box-shadow: 3px 3px 6px #00000029;
    border: 1px solid #9D9797;
    border-radius: 10px;
    box-sizing: border-box;
    
    ${revealAnimation};

    &::before {
        content: "${props => props.number}";
        position: absolute;
        width: 32px;
        height: 32px;
        left: -16px;
        top: calc(50% - 16px);
        text-align: center;
        line-height: 32px;
        font-size: 16px;
        color: ${FontColors.secondary};
        background-color: ${FontColors.driverCard};
        border-radius: 50%;
    }

    div {
        margin-right: 16px;
    }
`;
export const FullName = styled.span`
    font-size: 20px;
    color: ${FontColors.driverCard};
    margin-left: 32px;
`;