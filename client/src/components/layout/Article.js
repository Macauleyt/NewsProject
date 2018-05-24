import React from "react";

const Article = props => {
  const { details } = props; //Setup overall article viewer look using details props to build each card
  return (
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 d-flex">
      <div className="card-deck">
        <div className="card text-black bg-light mb-3">
          <div className="view overlay">
            <div className="view zoom">
              <a href={details.url} target="_blank">
                <img className="card-img-top" src={details.urlToImage} />
              </a>
            </div>
            <div className="card-body">
              <h5 className="card-title text-black">
                <a href={details.url} target="_blank">
                  {details.title}
                </a>
              </h5>

              <p className="card-text text-black descript">
                {details.description}
              </p>

              <a
                href={details.url}
                target="_blank"
                className="btn btn-warning btn-block">
                Link to article
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
