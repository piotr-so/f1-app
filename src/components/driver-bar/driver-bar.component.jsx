import React, { forwardRef } from 'react';

import DriverPoints from '../driver-points/driver-points.component';

import { DriverBarWrapper, FullName } from './driver-bar.styled';

const DriverBar = forwardRef(({ driver, points, position, theme }, ref) => {
    const { givenName, familyName } = driver;

    return (
        <DriverBarWrapper
            theme={theme}
            number={position}
            ref={ref}
        >
            <FullName>{givenName} {familyName}</FullName>
            <DriverPoints>{points}</DriverPoints>
        </DriverBarWrapper>
    )
});

export default DriverBar;