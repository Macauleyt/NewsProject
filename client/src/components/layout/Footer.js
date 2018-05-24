import React from "react";

export default () => {
  //Footer Render
  return (
    <div className="footerText">
      <div className="footer">
        <footer className="footer bg-dark text-white mt-5 p-4 text-center">
          Macauley Treleaven - <span className="onewordU">Newspaper</span>{" "}
          {new Date().getFullYear()} - Powered By{" "}
          <a className="onewordU" href="https://newsapi.org">
            NewsAPI
          </a>
        </footer>
      </div>
    </div>
  );
};
