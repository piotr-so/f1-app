import styled, { css, keyframes } from 'styled-components/macro';
import { ReactComponent as HomeSvg } from '../../assets/imgs/navigation/home.svg';
import { ReactComponent as DriversSvg } from '../../assets/imgs/navigation/drivers.svg';
import { ReactComponent as ConstructorsSvg } from '../../assets/imgs/navigation/constructors.svg';
import { FontColors, BackgroundColors } from '../../modules/constants';

const slideInText = keyframes`
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
`;

const growBackground = keyframes`
    from {
        opacity: 0;
        transform: scale(0.1,1);
    }
    to {
        opacity: 1;
        transform: scale(1,1);
    }
`;

export const NavigationWrapper = styled.div`
    position: fixed;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: ${BackgroundColors.secondary};
    z-index: 999;
    transition: transform .2s linear;
    ${props => props.visible ? 'transform: translateY(0)' : 'transform: translateY(60px)'};
`;

export const Button = styled.div`
    display: flex;
    justify-content: center;
    width: ${props => props.isactive ? "initial" : "48px"};
    height: 48px;
`;

const activeButtonContentBeforeElem = css`
    opacity: 1;
    transform: scale(1, 1);
    animation: ${growBackground} .2s ease-in;
`;

const activeImg = css`
    fill: ${FontColors.navElemActive};
    padding-left: 16px;
    z-index: 2;
`;

const activeDesc = css`
    color: ${FontColors.navElemActive};
    padding: 0 16px 0 8px;
    display: block;
    opacity: 1;
    transform: translateX(0px);
    animation: ${slideInText} .2s ease-in;
`;

export const ButtonContentWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-color: ${BackgroundColors.navElemActiveBg};
        border-radius: 50px;
        opacity: 0;
        transform: scale(0.1, 1);
        ${props => props.isactive && activeButtonContentBeforeElem}
    }
`;

export const HomeImg = styled(HomeSvg)`
    ${props => props.isactive && activeImg}
`;

export const DriversImg = styled(DriversSvg)`
    ${props => props.isactive && activeImg}
`;

export const TeamsImg = styled(ConstructorsSvg)`
    ${props => props.isactive && activeImg}
`;

export const Desc = styled.span`
    display: none;
    font-size: 12px;
    z-index: 1;
    opacity: 0;
    transform: translateX(-30px);
    ${props => props.isactive && activeDesc}
`;
