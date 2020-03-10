import styled, { css } from 'styled-components/macro';
import { FontColors } from '../../modules/constants';

export const TopConstructorsWrapper = styled.section`
    min-height: 356px;
    margin: 24px 0 60px 0;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.7s ease-in;
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