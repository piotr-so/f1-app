import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addCarImgsUrls } from '../../firebase/firebase.utils';
import ConstructorTile from '../constructor-tile/constructor-tile.component';
import { TopConstructorsWrapper, Title } from './top-constructors.styled';

const TopConstructors = () => {
    const [topContructors, setTopConstructors] = useState([]);

    const getTopContructorsData = async () => {
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

        setTopConstructors(
            [...topContructorsDataWithImgs]
        );
    }

    useEffect(() => {
        getTopContructorsData();
    }, []);

    return (
        <TopConstructorsWrapper reveal={topContructors.length > 0} onClick={() => window.location.reload()}>
            <Title>Best constructors</Title>
            {topContructors.length > 0 && topContructors.map((constructorTeam, idx) => (
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
}

export default TopConstructors;