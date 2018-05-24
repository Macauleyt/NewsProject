import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";
//Working Routes
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Search from "./components/layout/Search";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import dash2 from "./components/dash2/dash2";
import CreateProfile from "./components/createsavedart/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import NotFound from "./components/not-found/NotFound";
//Working route but functionality does not exist
import ArticleAdd from "./components/saveArticle/ArticleAdd.js";

//Style
import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  //Set Auth Token Header
  setAuthToken(localStorage.jwtToken);
  //Decoded token for user info and expiry
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expiry
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logoutUser

    store.dispatch(logoutUser());
    // clear profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/Search" component={Search} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/dash2" component={dash2} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/createsavedart"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/saveArticle"
                  component={ArticleAdd}
                />
              </Switch>

              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
