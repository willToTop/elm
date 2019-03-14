import React, { Component } from "react";
import List from "../../../components/List";
import $http from "../../../common/fetch";
import { acticleUrl } from "../../../common/url";
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    $http.postData(acticleUrl.list).then(data => {
      this.setState({
        list: data
      });
    });
  }
  render() {
    let { list } = this.state;
    return <List list={list} {...this.props} />;
  }
}

export default Article;
