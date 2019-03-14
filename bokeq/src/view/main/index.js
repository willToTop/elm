import React, { Component } from "react";
import {connect} from 'react-redux';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Article from './article'

import './index.css'
class Main extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let routers = this.props.children;
    return (
      <div className="main">
        <div className='main_title'>
          <Link to="/main">首页</Link>
          <Link to="/main/myArticle">我的</Link>
        </div>
        <div className='main_body'>
          <Switch>
            <Route exact path={'/main'} component={Article}/>
            {
              routers.map(item=>(
                <Route
                  key={item.path}
                  exact
                  path={item.path}
                  component={item.component}
                />
              ))
            }
          </Switch> 
        </div>
        <div className={`main_mask ${this.props.fetchState?'active':null}`}>
          <span>{this.props.fetchMsg}</span>
        </div>
      </div>
    )
    
  }
}
const mapStateToProps = state => ({
  fetchState:state.require.fetchState,
  fetchMsg:state.require.fetchMsg,
})
export default connect(mapStateToProps)(Main)
