import styled, { css } from 'styled-components/macro';
import { BackgroundColors, FontColors } from '../../modules/constants';

import { ReactComponent as TrophySVG } from '../../assets/imgs/driver-overview/trophy.svg';
import { ReactComponent as PodiumSVG } from '../../assets/imgs/driver-overview/podium.svg';
import { ReactComponent as RacingCarSVG } from '../../assets/imgs/driver-overview/racing-car.svg';
import { ReactComponent as RaceTrackSVG } from '../../assets/imgs/driver-overview/race-track.svg';

import { slideUpFromBottomAnimation, slideDownToBottomAnimation, revealTransition } from '../../modules/animations.styled';

export const StyledDriverOverviewModal = styled.div`
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    ${props => props.type && css`
        position: absolute;
        width: 354px;
        height: 639px;
        margin: 48px auto;
        top: 0;
    `};
`;

export const ModalWrapper = styled.div`
    ${props => props.type && css`
        border-radius: 0 0 32px 32px;
    `};
    background-color: ${BackgroundColors.secondary};
    
    ${slideUpFromBottomAnimation};

    ${props => props.isUnmounting && css`
        ${slideDownToBottomAnimation}
    `};
`;

export const ContentWrapper = styled.div`
    height: calc(${window.innerHeight}px - 64px);
    overflow-y: scroll;
    ${props => props.type && css`
        height: 575px;
        &::-webkit-scrollbar {
            display: none;
        };
    `};
`;

export const DriverBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 376px;
    background-image: url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 0 0 20px 20px;

    ${revealTransition}
`;

export const DriverPosition = styled.div`
    position: relative;
    width: 187px;
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: bold;
    color: ${FontColors.tertiary};
    border-radius: 50px;
    overflow: hidden;

    transform: ${props => props.reveal ? 'translateX(0px)' : 'translateX(70px)'};

    transition: transform .5s ease-in-out .4s;

    &::before {
        content: "${props => props.number}";
        position: absolute;
        width: 48px;
        height: 48px;
        left: 0;
        top: calc(50% - 24px);
        text-align: center;
        line-height: 48px;
        font-size: 24px;
        color: ${FontColors.secondary};
        background-color: ${BackgroundColors.main};
        border-radius: 50%;
        z-index: 2;
    }

    div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        box-sizing: border-box;
        width: 187px;
        height: 48px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #EE0000;
        border-radius: 50px;
        transform: ${props => props.reveal ? 'translateX(0px)' : 'translateX(-190px)'};
        transition: transform .5s ease-in-out .4s;
    }

    span {
        margin-right: 17px;
        white-space: nowrap;
    }
`;

export const DriverDescriptionWrapper = styled.div`
    margin: 24px 32px 32px 32px;
`;

export const NameAndTeamWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    padding-bottom: 24px;
    border-bottom: 1px solid #9D9797;
`;

export const Name = styled.span`
    font-size: 24px;
    display: block;
    color: ${FontColors.main};
    margin-bottom: 8px;
`;

export const Team = styled.span`
    position: relative;
    font-size: 16px;
    color: ${FontColors.main};
    &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        margin: 2px 0 0 5px;
        background: ${props => typeof (props.theme) === 'string' && BackgroundColors.construtorsStripes[props.theme]};
        border: ${props => props.theme === 'williams' || props.theme === 'haas' ? '1px solid #707070' : undefined};
        box-sizing: border-box;
        border-radius: 50%;
    }
`;
export const DetailedInfo = styled.div`
    ${revealTransition}
`;
export const InfographicsWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 24px 11px;
    border-bottom: 1px solid #9D9797;
`;
export const InfographicsLabel = styled.div`
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 127px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${FontColors.tertiary};
    background: ${BackgroundColors.secondary};
`;
export const InfographicElem = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Description = styled.div`
    font-weight: bold;
    text-align: center;
    color: ${FontColors.tertiary};
    margin-top: 8px;
    span {
        display: block;
    }
    span:first-child {
        font-size: 24px;
        margin-bottom: 4px;
    }
    span:nth-child(2) {
        font-weight: 16px;
    }
`;

const svgStyle = css`
    fill: ${BackgroundColors.main};
`;
export const Points = styled(TrophySVG)`
    ${svgStyle}
`;
export const RaceWins = styled(PodiumSVG)`
    ${svgStyle}
`;
export const PolePositionsNum = styled(RacingCarSVG)`
    ${svgStyle}
`;
export const PersonalInfoWrapper = styled.div`
    padding-top: 24px;
`;
export const InfoElem = styled.div`
    span {
        display: block;
        font-weight: bold;
        color: ${FontColors.main};
        margin-bottom: 24px;
    }
    span:first-child {
        font-size: 16px;
        margin-bottom: 4px;
    }
    span:nth-child(2) {
        font-size: 24px;
    }
`;

export const DriverLastResultWrapper = styled.div`
    ${revealTransition}
`;

export const CheckeredFlag = styled.div`
    width: 100%;
    height: 32px;
    background-image:
    linear-gradient(45deg, #000000 25%, transparent 25%), 
    linear-gradient(-45deg, #000000 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #000000 75%),
    linear-gradient(-45deg, transparent 75%, #000000 75%);

    background-size:16px 16px;    
    background-position:0px -8px,0px 16px,8px -16px,-8px 8px;
`;

export const LastResultInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 24px 32px;
    background: #9D979733;
`;

export const TrackImg = styled(RaceTrackSVG)`
    flex-shrink: 0;
    padding-top: 15px;
    display: inline-block;
`;

export const Info = styled.div`
    margin-left: 16px;
    span, p {
        font-weight: bold;
        color: ${FontColors.main};
    }
    span {
        display: block;
        font-size: 12px;
        margin-bottom: 12px;
    }
    p {
        font-size: 16px;
        margin: 0;
    }
`;

