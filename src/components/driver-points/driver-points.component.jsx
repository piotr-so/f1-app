import React from 'react';
import { Points } from './driver-points.styled';
const DriverPoints = ({children}) => {
    return (
        <Points>{children} PTS</Points>
    )
};

export default DriverPoints;