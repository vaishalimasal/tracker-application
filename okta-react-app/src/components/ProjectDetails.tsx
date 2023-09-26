import React from "react";
import "./projectDetails.css";
import underdraw from "../assets/undraw.png";

export default function ProjectDetails() {
  return (
    <div className="mainProjectDetails">
      <div className="pDnone">
        <h1>Welcome to Tracker</h1>
        <h3>
          Seems like you have not created any projects yet.{" "}
          <a href="/login/create-project">Click here</a> to upload a new Project
        </h3>
        <img src={underdraw} alt="img" className="pdimg" />
      </div>
    </div>
  );
}
