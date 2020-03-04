import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/header/header.component';
import Home from './screens/Home/Home.component';
import DriverStandings from './screens/Driver-Standings/Driver-Standings.component';
import ConstructorStandings from './screens/Constructor-Standings/Constructor-Standings.component';
import NavigationMenu from './components/navigation-menu/navigation-menu.component';

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/driver-standings">
          <DriverStandings />
        </Route>
        <Route exact path="/constructor-standings">
          <ConstructorStandings />
        </Route>
      </Switch>
      <NavigationMenu/>
    </Router>
  );
}

export default App;
