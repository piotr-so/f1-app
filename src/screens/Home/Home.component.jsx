import React from 'react';
import Header from '../../components/header/header.component';
import NextRace from '../../components/next-race-info/next-race-info.component';
import TopDrivers from '../../components/top-drivers/top-drivers.component';
import './Home.styled';

const Home = () => {
  return (
    <>
      <Header />
      <NextRace />
      <TopDrivers />
    </>
  );
}

export default Home;
