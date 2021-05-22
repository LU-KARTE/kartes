import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import React, { useScript, Component } from "react";
import Home from './Home';


function Geoman() {
    return(
        <div>Geoman</div>
    )
}

function NotFound() {
    return(
        <div>Error 404</div>
    )
}
function App() {
    return (
      <div>
          <HashRouter>
              <Switch>
                  <Route exact path='/geoman' component={Geoman}/>
                  <Route exact path='/' component={Home}/>
                  <Route component={NotFound} status={404}/>
              </Switch>
          </HashRouter>
      </div>
  );
}

export default App;
