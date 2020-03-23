import styled from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';
import { revealWithTranslateYTransition } from '../../modules/animations.styled';

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
    z-index: 1;
    ${revealWithTranslateYTransition}
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
    transition: transform 0.5s ease-in;

    &>div:first-child{
        margin-left: 24px;
    }
`;