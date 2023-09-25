import React from "react";

import { Route, Switch } from "react-router-dom";
import "./dashboard.css";
import ProjectDetails from "./ProjectDetails";
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
          <Route path="/login/project-details" component={ProjectDetails} />
          <Route path="/login/create-issue" component={CreateIssue} />
          <Route path="/login/create-project" component={CreateProject} />
        </Switch>
      </div>
    </div>
  );
}
