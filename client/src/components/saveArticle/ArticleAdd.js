import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

//Unfortunately this code does not work.

//This is my attempt of setting up the backend to allow users to save articles
// I want to save the article Data within the array which is part of my user database
// I was unsure how to specify which array value I wanted stored as I think
// they were all trying to be stored at once. Causing multiple crashed.
// Need to implement AXIOS POST request somewhere but not sure where or how.

class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      urlToImage: "",
      url: "",
      description: ""
    };
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-article">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto text-center">
              <h1>Saved Articles</h1>
              <div className="not-working">
                <h3>
                  Unfortuantely this feature is not active currently. Please
                  check back soon!
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ArticleAdd.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(ArticleAdd));
