import styled, { css, keyframes } from 'styled-components/macro';

import { BackgroundColors, FontColors } from '../../modules/constants';

import { revealTransition, revealAnimation } from '../../modules/animations.styled';

import SmartphoneImg from '../../assets/imgs/smartphone.png';
import MouseImg from '../../assets/imgs/mouse.png';

export const SmartphoneViewModal = styled.div`
    position:fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.9);
    z-index: 999;

    ${revealAnimation}
`;

const sharedBoxProperties = css`
    background-color: white;
    border-radius: 15px;
    box-shadow: 3px 3px 21px 0px rgba(50, 50, 50, 0.75);

    span {
        display: inline-block;
        width: 100%;
        height: 84px;
        background-color: ${BackgroundColors.main};
        color: ${FontColors.secondary};
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        line-height: 84px;
        border-radius: 15px 15px 0 0;
    }

    p {
        font-size: 18px;
        color: ${FontColors.main};
        line-height: 28px;
    }
`;

export const Info = styled.div`
    width: 700px;
    font-weight: bold;
    margin: 0 auto;

    ${sharedBoxProperties}

    p {
        margin: 32px 100px;
    }

    button {
        display: inherit;
        height: 50px;
        font-size: 18px;
        font-family: 'Ubuntu', sans-serif;
        margin: 0 auto 32px auto;
        padding: 0 15px;
        border: 2px solid red;
        border-radius: 10px;
        background: none;

        &:hover {
            cursor: pointer;
            border: 2px solid black;
        }
    }
`;

export const SmartphoneViewInfoBox = styled.div`
    width: 455px;
    font-weight: bold;
    margin: 0 50px;

    ${sharedBoxProperties}
    
    ${revealTransition};

    p {
        margin: 40px;
    }
`;

export const SmartphoneViewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* scale for 13' monitor */
    height: ${window.innerHeight < 709 ? `${window.innerHeight}px` : '100vh'};
    transform: ${window.innerHeight < 709 ? 'scale(0.8)' : undefined};
`;

export const SmartphoneWrapper = styled.div`
    position: relative;
    width: 407px;
    height: 709px;
    margin-top: 5px;
    overflow: hidden;
    border-radius: 15px;
`;

export const TopScreenCover = styled.div`
    width: 356px;
    height: 26px;
    background: ${BackgroundColors.main};
    margin: 22px auto 0 auto;
    z-index: 1;
`;

export const OuterScreen = styled.div`
    position: absolute;
    top: 0;
    width: 407px;
    height: 709px;
    background: url(${SmartphoneImg});
    z-index: 2;
`;

export const InnerScreen = styled.div`
    position: relative;
    width: 354px;
    height: 639px;
    margin: 48px 0 0 27px;
    border-radius: 0 0 31px 31px;
    overflow-y: ${props => props.isScrollable ? 'scroll' : 'hidden'};
    &::-webkit-scrollbar {
        display: none;
    };
    z-index: 1;
`;

export const ModalUnderlay = styled.div`
    position: absolute;
    top: 0;
    left: 27px;
    width: 356px;
    height: 687px;
    background: url(${SmartphoneImg});
    background-position-x: -27px;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    border-radius: 0 0 32px 32px;
    overflow: hidden;
    z-index: 2;
`;

const wheelRoll = keyframes`
    0% {
        transform: translateY(0px);
        opacity: 0;
    }
    30% {
        transform: translateY(10px);
        opacity: 1;
    }
    100% {
        transform: translateY(25px);
        opacity: 0;
    }
`;

export const MouseScrollIndicator = styled.div`
    position: relative;
    width: 128px;
    height: 128px;
    background: url(${MouseImg});
    transform: scale(0.5);

    &::before {
        content: '';
        position: absolute;
        top: 25px;
        left: 0px;
        right: 0px;
        margin: 0 auto;
        width: 10px;
        height: 18px;
        border-radius: 5px;
        background-color: black;
        animation: ${wheelRoll} 1.8s infinite;
    }
`;

export const NavigationAnchor = styled.div`
    position: absolute;
    width: 354px;
    height: 60px;
    bottom: 22px;
    left: 27px;
    border-radius: 0 0 31px 31px;
    overflow: hidden;
`;

