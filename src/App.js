import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { StateProvider } from './state/context';
import { initialState, reducer } from './state/reducer';

import Header from './components/header/header.component';
import NavigationMenu from './components/navigation-menu/navigation-menu.component';
import Home from './screens/Home/Home.component';
import DriverStandings from './screens/Driver-Standings/Driver-Standings.component';
import ConstructorStandings from './screens/Constructor-Standings/Constructor-Standings.component';
import DriverOverviewModal from './components/driver-overview-modal/driver-overview-modal.component';

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Header type={'app-header'} />
        <Route path="/:any/drivers/:driverId">
          <DriverOverviewModal />
        </Route>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/driver-standings">
            <DriverStandings />
          </Route>
          <Route path="/constructor-standings">
            <ConstructorStandings />
          </Route>
        </Switch>
        <NavigationMenu />
      </Router>
    </StateProvider>
  );
}

export default App;
