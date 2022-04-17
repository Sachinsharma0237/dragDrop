import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Login from './Views/Login/Login';
import Signup from './Views/Signup/Signup';
import Forgot from './Views/Forgot/Forgot';
import Home from './Views/Home/Home';

class App extends Component {
  state = {  } 

  render() { 
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/home" exact>
              <Home/>
          </Route>
          <Route path="/signup" exact>
              <Signup/>
          </Route>
          <Route path="/forgot" exact>
              <Forgot/>
          </Route>
          <Route path="*" exact>
            <Redirect to="/" ></Redirect>
          </Route>
        </Switch>
      </Router>
    )}
}
 
export default App;