import React from "react";
import "@clayui/css/lib/css/atlas.css";
import ClayCard from "@clayui/card";
import "./projectCard.css";

interface ProjectCardProps {
  item: {
    id: number;
    createdOn: string;
    summary: string;
    description: string;
    assignee: {
      name: string;
    };
    priority: number;
  };
  onDragStart: (e: React.DragEvent, item: any) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item, onDragStart }) => {
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

  const priorityClass = mapPriority(item.priority).toLowerCase();

  function formatDateToDDMMYYYY(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  }

  return (
    <div draggable onDragStart={(e) => onDragStart(e, item)}>
      <ClayCard>
        <ClayCard.Body>
          <div className="card-row">
            <div className="card-id">{item.id}</div>
            <div className="card-date">
              {formatDateToDDMMYYYY(item.createdOn)}
            </div>
          </div>

          <div className="card-row">
            <div className="card-heading">{item.summary}</div>
          </div>

          <div className="card-row">
            <span>{item.description}</span>
          </div>

          <div className={`card-row`}>
            <div className="user-project-card">
              <img
                src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=2048x2048&w=is&k=20&c=lDJRQWb0FtKq9R8biMKvGGZVqn0sVGlUHDPoxR83nWc="
                alt=""
              />
              <h5>{item.assignee.name}</h5>
            </div>

            <div>
              <p>Priority</p>
              <div className={`card-priority ${priorityClass}`}>
                {priorityClass}
              </div>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>
    </div>
  );
};

export default ProjectCard;
