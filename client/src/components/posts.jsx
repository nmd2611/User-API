import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verified: false,
      name: "",
      email: "",
    };
  }
  componentDidMount() {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const t = localStorage.getItem("auth-token");

    if (t) config.headers["auth-token"] = t;

    axios
      .get("/api/posts", config)
      .then((res) => {
        console.log(res);

        this.setState({
          verified: true,
          name: res.data.found.name,
          email: res.data.found.email,
        });
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
  }

  handleLogOut = () => {
    localStorage.removeItem("auth-token");
  };

  render() {
    if (this.state.verified)
      return (
        <div>
          <h1>Welcome , {this.state.name} </h1>
          <h3>Your email is {this.state.email}</h3>

          <h4 onClick={this.handleLogOut}>Logout</h4>
        </div>
      );

    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );
  }
}

export default Posts;
