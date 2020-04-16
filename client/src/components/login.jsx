import React, { Component } from "react";
import ReactDOM from "react-dom";
import { TextField } from "@material-ui/core";
import { Form, FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      redirect: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    axios
      .post("/api/user/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        let token = res.data;
        console.log(token);
        localStorage.setItem("auth-token", token);
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response) {
          this.setState({ error: err.response.data.msg });
        }
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log([e.target.name]);
  };

  loginUser = () => {};

  render() {
    if (this.state.redirect) return <Redirect to="/posts" />;
    return (
      <div>
        <h1>Login Page</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <br />
          <Button>Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
