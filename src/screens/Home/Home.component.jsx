import React, { useEffect, useState, useRef } from 'react';

import { useIO } from '../../modules/hooks';

import NextRace from '../../components/next-race-info/next-race-info.component';
import TopDrivers from '../../components/top-drivers/top-drivers.component';
import TopConstructors from '../../components/top-constructors/top-constructors.component';

import './Home.styled';

const Home = () => {

  const [elementVisibility, setElementVisibility] = useState({
    nextRace: false,
    topDrivers: false,
    topConstructors: false
  });

  const nextRaceRef = useRef();
  const topDriversRef = useRef();
  const topConstructorsRef = useRef();

  const [observer, setElements, entries] = useIO({ threshold: 0.5 });

  useEffect(
    () => {
      const currentElements = [nextRaceRef.current, topDriversRef.current, topConstructorsRef.current];
      setElements(currentElements);
    },
    [setElements]
  );

  useEffect(
    () => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setElementVisibility(prevState => ({
            ...prevState,
            [entry.target.id]: true
          }));
          observer.unobserve(entry.target);
        }
      })
    },
    [entries, observer]
  );

  const { nextRace, topDrivers, topConstructors } = elementVisibility;

  return (
    <>
      <NextRace
        ref={nextRaceRef}
        id={'nextRace'}
        elementVisibility={nextRace}
      />
      <TopDrivers
        ref={topDriversRef}
        id={'topDrivers'}
        elementVisibility={topDrivers}
      />
      <TopConstructors
        ref={topConstructorsRef}
        id={'topConstructors'}
        elementVisibility={topConstructors}
      />
    </>
  );
}

export default Home;
