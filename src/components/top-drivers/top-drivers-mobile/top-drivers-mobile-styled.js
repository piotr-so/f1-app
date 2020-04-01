import styled from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../../modules/constants';
import { revealWithTranslateYTransition } from '../../../modules/animations.styled';

export const TopDriversWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
export const BackgroundBox = styled.div`
    position: relative;
    width: 100%;
    height: 360px;
    background-color: ${BackgroundColors.main};
    z-index: 2;
    ${revealWithTranslateYTransition}
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
    background: radial-gradient(${BackgroundColors.main} 20%, rgba(0,0,0,0) 25%);
    background-size: 15px 15px;
    margin-top: -3px;
    z-index: 1;
    ${revealWithTranslateYTransition}
`;
export const Carousel = styled.div`
    position: relative;
    width: 100%;
    height: 320px;
    margin-top: 24px;
    overflow: hidden;
    
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 0 0 15px;
    &::-webkit-scrollbar {
            display: none;
    }
`;

export const CarouselTrack = styled.div`
    position: absolute;
    box-sizing: border-box;
    height: 320px;

    display: grid;
    grid-template-columns: repeat(5, 230px);
    grid-gap: 20px;
    padding: 0 250px 0 250px; 
`;