import React from "react";

import { Route, Switch } from "react-router-dom";
import "./dashboard.css";
import ProjectBoard from "./ProjectBoard";
import CreateIssue from "./CreateIssue";
import CreateProject from "./CreateProject";
import Navbar from "./Nabbar";
import Sidebar from "./Sidebar";
import Insights from "../pages/Insights";
import ProjectDetails from "../pages/ProjectDetails";

export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      <Navbar />
      <div className="sidebarMainContainer">
        <Sidebar />
        <div className="mainContainer">
          <Switch>
            <Route path="/login/project-board" component={ProjectBoard} />
            <Route path="/login/create-issue" component={CreateIssue} />
            <Route path="/login/create-project" component={CreateProject} />
            <Route
              exact
              path="/login/issue-details/:id"
              component={ProjectDetails}
            />
            <Route exact path="/login/insights/:id" component={Insights} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
