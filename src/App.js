import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import React, { useScript, Component } from "react";
import Home from './Home';
import Geoman from './Geoman';
import { ChakraProvider, Button} from "@chakra-ui/react"

function NotFound() {
    return(
        <div>Error 404</div>
    )
}
function App() {
    return (
    <>
      <HashRouter>
          <ChakraProvider>
              <Link to="/">
                  <Button m={1} colorScheme="blue">Home</Button>
              </Link>
              <Link to="/geoman">
                  <Button m={1} colorScheme="blue">Geoman</Button>
              </Link>
          </ChakraProvider>
          <Switch>
              <Route exact path='/geoman' component={Geoman}/>
              <Route exact path='/' component={Home}/>
              <Route component={NotFound} status={404}/>
          </Switch>
      </HashRouter>
    </>
  );
}

export default App;
