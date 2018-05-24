import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    //creates profile values
    super(props);
    this.state = {
      handle: "",
      location: "",
      bio: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this); //binds action to props
    this.onSubmit = this.onSubmit.bind(this); //binds action to props
  }

  componentDidMount() {
    this.props.getCurrentProfile(); //gets the current user and profile
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile; //checks to see if profile belongs to user

      this.setState({
        handle: profile.handle, //uses state to fill in already entered values
        location: profile.location,

        bio: profile.bio
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      //filling in values again using states
      handle: this.state.handle,
      location: this.state.location,
      bio: this.state.bio
    };

    this.props.createProfile(profileData, this.props.history);

    //create profile overides what profile already exists
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="- Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="- Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="- Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-mac btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
