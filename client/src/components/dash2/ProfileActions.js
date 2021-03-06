import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  //buttons to edit profile or view saved articles
  return (
    <div>
      <Link to="/saveArticle" className="btn btn-mac">
        <i className=" text-info" /> View Saved Articles
      </Link>
      <Link to="/edit-profile" className="btn btn-mac">
        <i className=" text-info" /> Edit Profile
      </Link>
    </div>
  );
};

export default ProfileActions;
