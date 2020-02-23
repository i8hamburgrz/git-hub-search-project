import React, { Component} from "react";
import {hot} from "react-hot-loader";
import Home from "./Home/Home";
import Search from "./Search/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(App);


// TODO: add link <a target="_blank" href="https://icons8.com/icons/set/search">Search icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>