import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Routes from './Routes';
import NavigationBar from './components/navigationbar';
import Location from './components/location'


function App() {
  return (
    <Router>
      <main>
        <NavigationBar />
        <Switch>
          {Routes.map((route) => (
            <Route exact path={route.path} key={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
        <Location></Location>
      </main>
    </Router>
  
  );
}

export default App;
