import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Posts from "./components/posts";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/posts">
            <Posts />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
