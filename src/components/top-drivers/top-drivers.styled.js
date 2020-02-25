import styled from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';
import dottedNetImg from '../../assets/backgrounds/dotted-net.png';

export const TopDriversWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
export const BackgroundBox = styled.div`
    width: 100%;
    height: 360px;
    background-color: ${BackgroundColors.main};
    z-index: 2;
`;
export const Title = styled.h1`
    font-size: 20px;
    color: ${FontColors.secondary};
    padding: 24px 0 0 24px;
    margin: 0;
`;
export const DottedBox = styled.div`
    align-self: flex-end;
    width: 224px;
    height: 72px;
    background: url(${dottedNetImg});
    z-index: 1;
`;
export const CardsSlider = styled.div`
    position: absolute;
    width: 100%;
    height: 314px;
    margin-top: 24px;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
`;

export const CardsSliderWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    transition: transform 0s ease-in-out;

    &>div:first-child{
        margin-left: 24px;
    }
`;