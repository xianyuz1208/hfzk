import React from 'react';
import './App.css';
import Login from './view/Login'
import Layout from './view/Layout'
import NotFound from './view/NotFound'
import {HashRouter as Router,Redirect,Switch,Route} from 'react-router-dom'
import CityList from './view/CtiyList';
import Map from './view/Map'
function App() {
  return (
    <Router>
    <div id="app">
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/layout" component={Layout} />
            <Route path="/citylist" component={CityList} />
            <Route path="/map" component={Map} />
            <Redirect exact from="/" to="/layout" />
            <Route component={NotFound} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
