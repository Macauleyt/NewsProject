import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions.js";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      //sets values for register form to blank
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this); //binds action
    this.onSubmit = this.onSubmit.bind(this); //bind action
  }

  //Redirect to search
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/search");
    }
  }
  //Setting errors as nextProps itself
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      //adds values to newUser which is passed to user mogngo schema and validation
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // Redirect from within this action withRouter

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center"> Sign Up </h1>{" "}
              <p className="lead text-center">
                {" "}
                Create your Newspaper account{" "}
              </p>{" "}
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />{" "}
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.value}
                  onChange={this.onChange}
                  error={errors.email}
                />{" "}
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-mac btn-block mt-4"
                />
              </form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

//Mapping Prop Types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//Handling state
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//Props Handling and Redirect withRouter
export default connect(mapStateToProps, {
  registerUser
})(withRouter(Register));
