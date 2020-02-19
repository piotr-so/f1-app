import styled from 'styled-components/macro';
import { BackgroundColors } from '../../modules/constants';
import { ReactComponent as LogoSVG } from '../../assets/imgs/f1_logo_white.svg';

export const AppHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: ${BackgroundColors.header};
`;

export const Logo = styled(LogoSVG)``;