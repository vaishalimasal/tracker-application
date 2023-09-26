import React from "react";

import { Route, Switch } from "react-router-dom";
import "./dashboard.css";
import ProjectBoard from "./ProjectBoard";
import CreateIssue from "./CreateIssue";
import CreateProject from "./CreateProject";
import Navbar from "./Nabbar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="mainContainer">
        <Switch>
          <Route path="/login/project-board" component={ProjectBoard} />
          <Route path="/login/create-issue" component={CreateIssue} />
          <Route path="/login/create-project" component={CreateProject} />
          {/* <Route exact path="/issue-details/:id" component={IssueDetails} />
          <Route exact path="/insights" component={Insights} /> */}
        </Switch>
      </div>
    </div>
  );
}
