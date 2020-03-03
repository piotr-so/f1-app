import styled, { css, keyframes } from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

const grow = (widthAmount) => keyframes`
    from {
        width: 0%;
        opacity: 0;
    }
    to {
        width: ${widthAmount};
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateX(-160px);
    }
    to {
        transform: translateX(0);
    }
`;

export const ConstructorWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
`;
export const ConstructorDesc = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 12px;
`;
export const Name = styled.h2`
    font-size: 20px;
    color: ${FontColors.main};
    padding-left: 36px;
    margin: 0 0 4px 0;
`;

export const CarImgContainer = styled.div`
    position: relative;
    width: 100%;
`;
export const CarImg = styled.img`
    width: 154px;
    height: 45px;
    padding-left: 6px;
    animation: ${slideIn} 1s ease-in-out;
`;

const stripe = css`
    position: absolute;
    background-color: ${props => props.constructorId && css`
        ${BackgroundColors.construtorsStripes[props.constructorId]};
    `};
    z-index: -1;
`;

export const StripeOne = styled.div`
    ${stripe}
    width: 100%;
    height: 6px;
    top: 26px;
    animation: ${grow("100%")} 1s ease-in-out;
`;
export const StripeTwo = styled.div`
    ${stripe}
    width: 75%;
    height: 4px;
    top: 36px;
    animation: ${grow("75%")} 1s ease-in-out;
`;
export const StripeThree = styled.div`
    ${stripe}
    width: 42%;
    height: 2px;
    top: 43px;
    animation: ${grow("42%")} 1s ease-in-out;
`;
export const PointsInfo = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-right: 36px;
`;
export const Number = styled.span`
    font-size: 40px;
    font-weight: bold;
    color: ${FontColors.secondary};
    -webkit-text-stroke-color: ${FontColors.main};
    -webkit-text-stroke-width: 2px; 
`;
export const Desc = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: ${FontColors.main};
`;