import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div>
          <p>
            New User ? <Link to="/register">Register</Link>
          </p>
          <p>
            Already Registered . <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
