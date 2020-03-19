import React from 'react';

import { StyledButton } from './button.styled';

const Button = ({ children }) => {
    return (
        <StyledButton>
            {children}
        </StyledButton>
    )
}

export default Button;