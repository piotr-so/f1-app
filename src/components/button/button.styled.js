import styled from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

export const StyledButton = styled.button`
    width: 176px;
    height: 48px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: ${FontColors.secondary};
    background: ${BackgroundColors.main} 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 6px #00000029;
    border: 1px solid #EE0000;
    border-radius: 10px;

    cursor: ${window.innerWidth > 450 ? 'pointer' : undefined};
`;