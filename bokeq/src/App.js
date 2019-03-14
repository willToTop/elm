import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import router from "./common/router";
import { NoMatch } from "./view/nomatch";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: "100vh" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/main" />} />
            {router.map(item => {
              const children = item.children;
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  render={(props)=>{
                    return(
                      <item.component {...props} children={children} />
                    )
                  }}
                />
              );
            })}
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
