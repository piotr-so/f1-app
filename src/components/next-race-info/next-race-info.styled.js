import styled, { css } from 'styled-components/macro';
import { FontColors } from '../../modules/constants';
import checkeredFlagImg from '../../assets/backgrounds/checkered-flag.svg'

export const NextRaceEventWrapper = styled.section`
    display: flex;
    justify-content: center;
    padding: 24px;
`;

export const RaceInfoBox = styled.div`
    width: 327px;
    height: 200px;
    border: 1px solid red;
    border-radius: 0 0 5px 5px;
    transform: translateY(-10px);
    opacity: 0;
    transition: all 0.7s;

    ${props => props.reveal && css`
        transform: translateY(0);
        opacity: 1;
    `}
`;

export const CheckeredFlag = styled.div`
    max-width: 327px;
    height: 32px;
    background-image: url(${checkeredFlagImg});
`;

export const ElementsWrapper = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(2, 1fr);
    padding: 8px 16px 0 16px;
    span {
        color: ${FontColors.main};
    }
    span:nth-child(1) {
        grid-column: 1;
        font-size: 14px;
        padding-top: 8px;
    }
    span:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
        font-size: 20px;
        font-weight: bold;
    }
`;

export const TrackImg = styled.img`
    grid-column: 2;
    grid-row: 1 / 3;
    justify-self: end;
    width: 128px;
    height: 96px;
    filter: invert(100%);
`;