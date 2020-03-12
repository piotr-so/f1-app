import styled from 'styled-components/macro';
import {FontColors, BackgroundColors} from '../../modules/constants';

export const Points = styled.div`
    min-width: 84px;
    text-align: center;
    font-size: 16px;
    color: ${FontColors.secondary};
    background-color: ${BackgroundColors.driverCard};
    border-radius: 5px;
`;