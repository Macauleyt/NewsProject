import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  //Redirect to search page if logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/search");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Newspaper</h1>

                <p className="lead">
                  <span className="oneword">News.</span> All in one place!
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-mac mr-2">
                  Sign Up!
                </Link>
                <Link to="/login" className="btn btn-lg btn-dark">
                  Login!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
