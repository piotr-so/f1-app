import styled from 'styled-components/macro';
import { FontColors } from '../../modules/constants';
import { revealWithTranslateYTransition } from '../../modules/animations.styled';

export const TopConstructorsWrapper = styled.section`
    min-height: 356px;
    margin: 24px 0 60px 0;
    ${revealWithTranslateYTransition}
`;
export const Title = styled.h1`
    font-size: 20px;
    color: ${FontColors.main};
    margin: 24px;
`;