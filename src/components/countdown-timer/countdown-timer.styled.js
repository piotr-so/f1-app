import styled from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

export const BoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    font-weight: bold;
    margin-top: 8px;
`;

export const Element = styled.div`
    color: ${FontColors.main};
    text-align: center;
`;

export const Number = styled.div`
    width: 24px;
    height: 24px;
    font-size: 16px;
    line-height: 24px;
    background-color: ${BackgroundColors.timerBoxNumberBackground};
    border-radius: 5px;
    margin: 0 auto;
`;

export const Description = styled.div`
    font-size: 8px;
    margin-top: 8px;
`;
export const Separator = styled.span`
    line-height: 24px;
    margin: 0 6px;
`;