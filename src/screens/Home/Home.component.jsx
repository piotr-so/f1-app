import React, { useEffect, useState, useRef } from 'react';

import NextRace from '../../components/next-race-info/next-race-info.component';
import TopDrivers from '../../components/top-drivers/top-drivers.component';
import TopConstructors from '../../components/top-constructors/top-constructors.component';

import './Home.styled';

const Home = () => {

  const [element, setElement] = useState(null);
  const [elementVisibility, setElementVisibility] = useState({
    topContructors: false
  });
  
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const topContrustorsElement = entries[0];
      if (topContrustorsElement.isIntersecting) {
        setElementVisibility(prevState => ({
          ...prevState,
          topContructors: true
        }));
      }
    },
      { threshold: 0.5 }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) currentObserver.unobserve(currentElement);
    }
  }, [element])

  return (
    <>
      <NextRace />
      <TopDrivers />
      <TopConstructors ref={setElement} elementVisibility={elementVisibility.topContructors} />
    </>
  );
}

export default Home;
