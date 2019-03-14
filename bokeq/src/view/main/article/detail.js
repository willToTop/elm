import React, { Component } from "react";
import $http from "../../../common/fetch";
import { acticleUrl } from "../../../common/url";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        comments: []
      }
    };
  }
  componentDidMount() {
    
    const id = this.props.match.params.id;

    $http.postData(acticleUrl.detail, { id }).then(data => {
      this.setState({
        content:data
      })
    });
  }
  render() {
    let { content } = this.state;
    return (
      <div className="article_detail">
        <h2 style={{ textAlign: "center" }}>{content.title}</h2>
        <p>{content.content}</p>
        <div className="comments">
          {content.comments.map((item, index) => (
            <div key={index}>
              <h3>{item.user}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Detail;
