import React, { useEffect, forwardRef, useCallback } from 'react';
import axios from 'axios';

import { useStateValue } from '../../state/context';
import { setTopContructorsData } from '../../state/actions';

import { addCarImgsUrls } from '../../firebase/firebase.utils';

import ConstructorTile from '../constructor-tile/constructor-tile.component';
import { TopConstructorsWrapper, Title } from './top-constructors.styled';

const TopConstructors = forwardRef(({ elementVisibility }, ref) => {
    const [{ topConstructors }, dispatch] = useStateValue();

    const getTopContructorsData = useCallback(
        async () => {
            let res = await axios.get('http://ergast.com/api/f1/current/constructorStandings.json');
            const topContructorsData = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.slice(0, 3);

            const topContructorsDataFiltered = topContructorsData.map(constructorDataElem => {
                return {
                    constructorId: constructorDataElem.Constructor.constructorId,
                    constructorName: constructorDataElem.Constructor.name,
                    position: constructorDataElem.position,
                    points: constructorDataElem.points
                }
            })

            let topContructorsDataWithImgs = await addCarImgsUrls(topContructorsDataFiltered);

            dispatch(
                setTopContructorsData([...topContructorsDataWithImgs])
            )
        },
        [dispatch]
    );

    useEffect(
        () => {
            if (topConstructors.length === 0) getTopContructorsData();
        },
        [topConstructors.length, getTopContructorsData]
    );


    return (
        <TopConstructorsWrapper reveal={elementVisibility && topConstructors.length > 0} ref={ref}>
            <Title>Best constructors</Title>
            {elementVisibility && topConstructors.map((constructorTeam, idx) => (
                <ConstructorTile
                    key={`${constructorTeam.constructorId}-${idx + 1}`}
                    constructorId={constructorTeam.constructorId}
                    constructorName={constructorTeam.constructorName}
                    position={idx + 1}
                    points={constructorTeam.points}
                    img={constructorTeam.carImgUrl}
                />
            ))}
        </TopConstructorsWrapper>
    )
});

export default TopConstructors;