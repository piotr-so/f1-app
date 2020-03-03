import styled, { css } from 'styled-components/macro';
import { FontColors } from '../../modules/constants';

export const TopConstructorsWrapper = styled.section`
    min-height: 356px;
    margin-top: 24px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.7s;
    ${props => props.reveal && css`
        transform: translateY(0);
        opacity: 1;
    `}
`;
export const Title = styled.h1`
    font-size: 20px;
    color: ${FontColors.main};
    margin: 24px;
`;