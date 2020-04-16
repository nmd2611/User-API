import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      redirect: false,
      error: "",
    };
  }

  registerUser = () => {
    console.log(this.state);
    // console.log("Button clicked");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log([e.target.name]);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => {
        // this.setState({ error: err.msg });
        if (err.response) {
          console.log(err.response.data.msg);
          this.setState({ error: err.response.data.msg });
        }
      });
    console.log(this.state);
  };

  render() {
    const { name, email, password, error } = this.state;
    const values = { name, email, password };
    if (this.state.redirect) return <Redirect to="/login" />;
    return (
      <div>
        {error !== "" ? <h4>{error}</h4> : ""}
        <h1>Registration Page</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <div>
            <FormGroup>
              <Input
                placeholder="Name"
                type="text"
                name="name"
                onChange={this.handleChange}
              />
            </FormGroup>

            <br />

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
            <br />
            <Button
              variant="outlined"
              color="primary"
              //onClick={this.registerUser}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Register;
