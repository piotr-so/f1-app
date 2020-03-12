import { css, keyframes } from 'styled-components';

const reveal = css`
    transform: translateY(0);
    opacity: 1;
`;

export const revealTransitionSetting = css`
    transform: translateY(-10px);
    transition: all .7s ease-in;
    ${props => props.reveal && reveal}
`;

const revealAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const revealAnimationSetting = css`
    animation: ${revealAnimation} .4s ease-in;
`;