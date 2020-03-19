import { css, keyframes } from 'styled-components';


export const revealTransition = css`
    opacity: ${props => props.reveal ? '1' : '0'};
    transition: opacity .4s ease-in;
`;

const reveal = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const revealAnimation = css`
    animation: ${reveal} .4s ease-in;
`;

const revealWithTranslateY = css`
    opacity: 1;
    transform: translateY(0);
`;

export const revealWithTranslateYTransition = css`
    opacity: 0;
    transform: translateY(-10px);
    transition: all .7s ease-in;
    ${props => props.reveal && revealWithTranslateY}
`;


const slideUpFromBottom = keyframes`
    from {
        transform: translateY(${window.innerHeight}px);
    }
    to {
        transform: translateY(0);
    }
`;

export const slideUpFromBottomAnimation = css`
    /* starting point */
    transform: translateY(${window.innerHeight}px);

    animation: ${slideUpFromBottom} .5s ease;
    animation-fill-mode: forwards;
`;

const slideDownToBottom = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(${window.innerHeight}px);
    }
`;

export const slideDownToBottomAnimation = css`
    /* starting point */
    transform: translateY(0);

    animation: ${slideDownToBottom} .5s ease;
    animation-fill-mode: forwards;
`;