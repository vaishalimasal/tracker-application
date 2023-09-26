import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/project-board.png";

import ProjectCard from "./ProjectCard/ProjectCard";
import Button from "@clayui/button";
import DropDown from "@clayui/drop-down";
import projectApi from "../apis/projectApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  setProjects,
  setSelectProject,
  setTeamMembers,
} from "../store/slices/projectSlice";

import "./projectBoard.css";

type ProjectType = {
  label: string;
  value: string;
};

const ProjectBoard: React.FC = () => {
  const dispatch = useDispatch();

  const [selectedAssignee, setSelectedAssignee] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  useEffect(() => {
    const fetchProjects = async () => {
      //   const response = await projectApi.get(`/project`).catch((err) => {
      //     console.log(err);
      //   });
      //   dispatch(setProjects(response.data));
      //   dispatch(setSelectProject(response.data[0]));
      // };
      try {
        const response = await projectApi.get(`/project`);
        dispatch(setProjects(response.data));
        console.log("vaishali.....", response.data);
        dispatch(setSelectProject(response.data[0]));
      } catch (err) {
        console.log(err);
      }
    };

    console.log("bdbsjnmn ");
    fetchProjects();
  }, []);

  const projects = useSelector(getAllProject).allProject;
  const selectedProject = useSelector(getAllProject).selectedProject;
  const [assignees, setAssignees] = useState([]);

  // useEffect(() => {
  //   const fetchAssignee = async () => {
  //     if (
  //       selectedProject &&
  //       selectedProject.projectOwner &&
  //       selectedProject.projectOwner.teamName
  //     ) {
  //       const response = await projectApi
  //         .get(`/user?teamName=${selectedProject.projectOwner.teamName}`)
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       setAssignees(response.data);
  //       dispatch(setTeamMembers(response.data));
  //     }
  //   };
  //   fetchAssignee();
  // }, [selectedProject]);

  useEffect(() => {
    const fetchAssignee = async () => {
      if (
        selectedProject &&
        selectedProject.projectOwner &&
        selectedProject.projectOwner.teamName
      ) {
        const response = await projectApi
          .get(`/user?teamName=${selectedProject.projectOwner.teamName}`)
          .catch((err) => {
            console.log(err);
          });

        if (response) {
          setAssignees(response.data || []);
          dispatch(setTeamMembers(response.data || []));
        }
      }
    };
    fetchAssignee();
  }, [selectedProject]);

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProject) {
      const fetchCardData = async () => {
        try {
          const response = await projectApi.get(
            `/issue?projectID=${selectedProject.projectID}`
          );
          if (response && response.data) {
            // Check if response is not undefined and has data
            const cardDataWithSection = response.data.map((item: any) => ({
              ...item,
              section: "todo",
            }));
            setItems(cardDataWithSection);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchCardData();
    }
  }, [selectedProject]);

  // useEffect(() => {
  //   if (selectedProject) {
  //     const fetchCardData = async () => {
  //       const response = await projectApi
  //         .get(`/issue?projectID=${selectedProject.projectID}`)
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       const cardDataWithSection = response.data.map((item: any) => ({
  //         ...item,
  //         section: "todo",
  //       }));
  //       setItems(cardDataWithSection);
  //     };
  //     fetchCardData();
  //   }
  // }, [selectedProject]);

  function mapStatusToSectionName(status: string) {
    switch (status) {
      case "todo":
        return "todo";
      case "dev":
        return "development";
      case "test":
        return "testing";
      case "done":
        return "completed";
      default:
        return "unknown"; // Handle unknown status values if needed
    }
  }

  const typeOptions: ProjectType[] = projects.map((project: any) => ({
    label: project.projectName,
    value: project.projectID,
  }));

  const assigneeOptions = assignees.map((assignee: any) => ({
    label: assignee.name,
    value: assignee.id,
  }));

  const priorityOptions = [
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  const sectionNames = ["todo", "development", "testing", "completed"];

  const len = projects.length;

  const handleSelectProject = (value: string) => {
    const newSelectProject = projects.filter(
      (project: any) => project.projectID === value
    );
    dispatch(setSelectProject(newSelectProject[0]));
  };

  const mapPriority = (priorityNumber: number) => {
    switch (priorityNumber) {
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Unknown";
    }
  };

  const filterItems = () => {
    let filteredItems = items;

    if (selectedAssignee) {
      filteredItems = filteredItems.filter((item: any) => {
        return item.assignee.name === selectedAssignee;
      });
    }

    if (selectedPriority) {
      filteredItems = filteredItems.filter((item: any) => {
        return mapPriority(item.priority).toLowerCase() === selectedPriority;
      });
    }

    return filteredItems;
  };

  const onDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData("text/plain", item.id);
  };

  const onDragOver = (e: React.DragEvent, section: string) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, section: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    const updatedItems = items.map((item: any) => {
      if (item.id === itemId) {
        item.section = section;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const renderItemsInSection = (section: string) => {
    const filteredItems = filterItems();

    return filteredItems
      .filter((item: any) => item.section === section)
      .map((item: any) => (
        <ProjectCard key={item.id} item={item} onDragStart={onDragStart} />
      ));
  };

  return (
    <div>
      {len < 1 ? (
        <div className="project-board">
          <h2>Welcome to Tracker</h2>
          <p>
            Seems like you haven't created any projects yet.{" "}
            <Link to="/login/create-project">Click here</Link> to onboard a new
            project.
          </p>
          <div className="board-image">
            <img src={image} alt="project-board" />
          </div>
        </div>
      ) : (
        <>
          <div className="project-borad-header">
            <h1 className="project-details-heading">Project Details</h1>
            <Link
              className="link"
              to={`/login/insights/${selectedProject.projectID}`}
            >
              VIEW INSIGHTS
            </Link>
          </div>
          <div className="search-project">
            <div className="select-project">
              <label htmlFor="Project Name">Project Name</label>
              <DropDown
                trigger={
                  <Button className="find-project">
                    <div>
                      <div>{selectedProject.projectName}</div> <div>v</div>
                    </div>
                  </Button>
                }
                menuElementAttrs={{ className: "dropdown-menu" }}
              >
                <DropDown.Search placeholder="Type to filter" />

                <DropDown.ItemList items={typeOptions}>
                  {(item: any, index: number) => (
                    <DropDown.Item
                      key={item.value}
                      onClick={() => handleSelectProject(item.value)}
                    >
                      {item.label}
                    </DropDown.Item>
                  )}
                </DropDown.ItemList>
              </DropDown>
            </div>
            <div className="project-owner select-project">
              <label htmlFor="Project Owner">Project Owner</label>
              <Button className="find-project">
                <div>
                  <div>{selectedProject.projectOwner.name}</div>{" "}
                </div>
              </Button>
            </div>
          </div>
          <p className="start-end-date">
            {" "}
            Start Date : 31-01-22 <span> | </span> End Date : 31-04-22
          </p>
          <div className="filter-btn">
            <div className="select-project">
              <DropDown
                trigger={
                  <Button className="find-project">
                    <div>
                      <div>{selectedAssignee || "Select Assignee"}</div>{" "}
                      <div>v</div>
                    </div>
                  </Button>
                }
                menuElementAttrs={{ className: "dropdown-menu" }}
              >
                <DropDown.Search placeholder="Type to filter" />

                <DropDown.ItemList items={assigneeOptions}>
                  {(item: any, index: number) => (
                    <DropDown.Item
                      key={index}
                      onClick={() => setSelectedAssignee(item.label)}
                    >
                      {item.label}
                    </DropDown.Item>
                  )}
                </DropDown.ItemList>
              </DropDown>
              <label htmlFor="Filter Assignee">Filter Assignee</label>
            </div>
            <div className="select-project">
              <DropDown
                trigger={
                  <Button className="find-project">
                    <div>
                      <div>{selectedPriority || "Select Priority"}</div>{" "}
                      <div>v</div>
                    </div>
                  </Button>
                }
                menuElementAttrs={{ className: "dropdown-menu" }}
              >
                <DropDown.Search placeholder="Type to filter" />

                <DropDown.ItemList items={priorityOptions}>
                  {(item: any, index: number) => (
                    <DropDown.Item
                      key={index}
                      onClick={() => setSelectedPriority(item.value)}
                    >
                      {item.label}
                    </DropDown.Item>
                  )}
                </DropDown.ItemList>
              </DropDown>
              <label htmlFor="Filter Priority">Filter Priority</label>
            </div>
          </div>
          <div className="project-details-container">
            <div className="sections-container">
              {sectionNames.map((sectionName) => (
                <div
                  key={sectionName}
                  className="section"
                  onDragOver={(e) => onDragOver(e, sectionName)}
                  onDrop={(e) => onDrop(e, sectionName)}
                >
                  <h2>{sectionName.toUpperCase()}</h2>
                  {renderItemsInSection(sectionName)}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectBoard;

/* import React from "react";
import "./projectDetails.css";
import underdraw from "../assets/undraw.png";

export default function ProjectBoard() {
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
 */
