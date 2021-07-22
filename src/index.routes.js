/* Modules */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Containers */
import Main from "./containers/Main/Main";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
