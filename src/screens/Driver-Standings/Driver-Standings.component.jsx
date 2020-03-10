import React from 'react';
import { useStateValue } from '../../state/context';

const DriverStandings = () => {
    const [{ drivers }, dispatch] = useStateValue();
    return (
        <>
            <div>Driver Standings</div>
            {drivers.length > 0 && drivers.map(driverElem => <div>{driverElem.Driver.familyName}</div>)}
        </>
    )
}

export default DriverStandings;