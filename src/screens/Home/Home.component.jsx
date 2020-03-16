import React, { useEffect, useRef } from 'react';

import { useIO } from '../../modules/hooks';
import { useStateValue } from '../../state/context';
import { setTopConstructorsVisible, saveWindowPos } from '../../state/actions';

import NextRace from '../../components/next-race-info/next-race-info.component';
import TopDrivers from '../../components/top-drivers/top-drivers.component';
import TopConstructors from '../../components/top-constructors/top-constructors.component';

import './Home.styled';

const Home = () => {

  const [{ topConstructorsVisible, windowPositions }, dispatch] = useStateValue();

  const topConstructorsRef = useRef();

  const [observer, setElements, entries] = useIO({ threshold: 0.2 });

  useEffect(
    () => {
      if (windowPositions.Home) {
        window.scrollTo(0, 0);
        setTimeout(() => window.scrollTo({ top: windowPositions.Home, behavior: 'smooth'}), 100);
      };

      const currentElements = [topConstructorsRef.current];
      setElements(currentElements);

      return () => {
        dispatch(
          saveWindowPos({
            'Home': window.scrollY
          })
        )
      }
    },
    [setElements, dispatch, windowPositions.Home]
  );

  useEffect(
    () => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dispatch(
            setTopConstructorsVisible()
          );
          observer.unobserve(entry.target);
        }
      })
    },
    [entries, observer, dispatch]
  );

  return (
    <>
      <NextRace
        id={'nextRace'}
        elementVisibility={true}
      />
      <TopDrivers
        id={'topDrivers'}
        elementVisibility={true}
      />
      <TopConstructors
        ref={topConstructorsRef}
        id={'topConstructors'}
        elementVisibility={topConstructorsVisible}
      />
    </>
  );
}

export default Home;
