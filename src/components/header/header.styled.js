import styled from 'styled-components/macro';
import { BackgroundColors, FontColors } from '../../modules/constants';
import { ReactComponent as LogoSVG } from '../../assets/imgs/f1_logo_white.svg';
import { ReactComponent as ArrowSVG } from '../../assets/imgs/driver-overview/left-arrow.svg';

export const HeaderWrapper = styled.header`
    display: flex;
    justify-content: ${props => props.headerType === 'app-header' ? 'center' : 'left'};
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: ${BackgroundColors.header};
`;

export const Logo = styled(LogoSVG)``;

export const ArrowContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 16px;
`;

export const ArrowBack = styled(ArrowSVG)`
    fill: ${BackgroundColors.secondary};
`;

export const Title = styled.h1`
    font-size: 20px;
    color: ${FontColors.secondary};
    margin: 0 0 0 16px;
`;