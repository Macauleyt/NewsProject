import React, { Component } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";

class Select extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    this.state = {
      //array value for articledata
      data: [],
      value: this.props.default
    };
    this.onChange = this.onChange.bind(this);
    this.apiUrl =
      //pass in own apikey for source list
      "https://newsapi.org/v2/sources?language=en&apiKey=543e7f3fc3ba481ab3c2897d5bb28d21";
  }
  // Handle the Select Change from the Select Options
  onChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  }

  //Get News SOurces from the API
  componentDidMount() {
    {
      this.props.getCurrentProfile();
    }
    axios.get(this.apiUrl).then(response => {
      let sourcesData = response.data;
      this.setState({ data: sourcesData.sources });
    });
    console.log(this.state.data);
  }

  // Render Method
  render() {
    const allSources = this.state.data;
    const { user } = this.props.auth;
    if (this.props.auth.isAuthenticated) {
    } else {
      this.props.history.push("/login");
    }
    return (
      <div>
        <div className="row text-center">
          <div className="col-lg-12">
            <div className="bigtitle">
              <h1>
                <span className="oneword">News.</span> All in one place!
              </h1>
            </div>
            <Link className="account-name" to="/dash2">
              <h2>
                <span className="hi">Hi,</span> {user.name}.
              </h2>
            </Link>
            <h5>Select a source from the dropdown menu.</h5>

            <select value={this.state.value} onChange={this.onChange}>
              {Object.keys(allSources).map(paper => (
                <option key={paper} value={allSources[paper].id}>
                  {allSources[paper].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Dashboard default={this.state.value} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Select);
