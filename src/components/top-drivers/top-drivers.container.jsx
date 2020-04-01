import React from 'react';

import TopDriversSimView from './top-drivers-simview/top-drivers.component';
import TopDriversMobile from './top-drivers-mobile/top-drivers-mobile.component';

const TopDriversContainer = (props) => {
    return (
        window.innerWidth > 450 ?
            <TopDriversSimView {...props} />
            :
            <TopDriversMobile {...props}/>
    )
}

export default TopDriversContainer