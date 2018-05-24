import React, { Component } from "react";

import axios from "axios";
import Article from "./Article";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [] //article data stored here as array
    };
  }

  componentDidMount() {
    this.getArticles(this.props.default); //calls getArticles function using props
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        url: `https://newsapi.org/v2/top-headlines?sources=${
          nextProps.default
        }&apiKey=543e7f3fc3ba481ab3c2897d5bb28d21` //API key that sets up the axios.get request
      });
      this.getArticles(nextProps.default);
    }
  }

  getArticles(url) {
    this.setState({ articles: [] });
    const API = "543e7f3fc3ba481ab3c2897d5bb28d21";
    axios
      .get(`https://newsapi.org/v2/top-headlines?sources=${url}&apiKey=${API}`) //axios get request
      .then(response => {
        const data = response.data.articles; //store data from articles as data
        console.log(data);
        this.setState({ articles: data }); //set state for use in article render
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const articleState = this.state.articles;
    let views = <div className="center-select" />;
    if (articleState && articleState.length > 0) {
      views = Object.keys(articleState).map(article => (
        <Article key={article} details={articleState[article]} />
      ));
    }
    return (
      <div className="container">
        <br />
        <div className="row">{views}</div>
        <br />
      </div>
    );
  }
}

export default Dashboard;
