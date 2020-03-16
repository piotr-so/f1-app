import React, { useEffect, forwardRef, useCallback } from 'react';

import { useStateValue } from '../../state/context';
import { setTopConstructorsData } from '../../state/actions';
import { useGetData } from '../../modules/hooks';
import { addCarImgsUrls } from '../../firebase/firebase.utils';

import ConstructorTile from '../constructor-tile/constructor-tile.component';
import { TopConstructorsWrapper, Title } from './top-constructors.styled';

const TopConstructors = forwardRef(({ elementVisibility, id }, ref) => {
    const [{ constructors, topConstructorsData }, dispatch] = useStateValue();
    const [setRequestedData] = useGetData();

    const selectTopConstructorsData = useCallback(
        async () => {
            const topConstructors = constructors.slice(0, 3);

            const topContructorsDataFiltered = topConstructors.map(constructorDataElem => {
                return {
                    constructorId: constructorDataElem.Constructor.constructorId,
                    constructorName: constructorDataElem.Constructor.name,
                    position: constructorDataElem.position,
                    points: constructorDataElem.points
                }
            })

            let topContructorsDataWithImgs = await addCarImgsUrls(topContructorsDataFiltered);
            dispatch(
                setTopConstructorsData(topContructorsDataWithImgs)
            );
        },
        [constructors, dispatch]
    );

    useEffect(
        () => {
            if (constructors.length === 0) setRequestedData('constructors-data');
            if (constructors.length > 0) selectTopConstructorsData();
        },
        [constructors.length, setRequestedData, selectTopConstructorsData]
    );


    return (
        <TopConstructorsWrapper reveal={elementVisibility && topConstructorsData.length > 0} ref={ref} id={id}>
            <Title>Best constructors</Title>
            {elementVisibility && topConstructorsData.length && topConstructorsData.map((constructorTeam, idx) => (
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