import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import ProfileActions from "./ProfileActions";

class dash2 extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let content;

    if (profile === null || loading) {
      content = <h4>Loading...</h4>;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            <p className="lead text-muted text-center">
              Welcome {profile.handle}
            </p>
            <div className="text-center">
              <ProfileActions />

              <div style={{ marginBottom: "60px" }} />
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-warning ">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>
              You have not yet setup a profile. Click the button below to set
              one up!
            </p>
            <Link to="/createsavedart" className="btn btn-lg btn-warning">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">My Account</h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

dash2.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  dash2
);
