import React from "react";
import "./projectStatus.css";

interface ProjectStatusProps {
  todo: number;
  testing: number;
  development: number;
  completed: number;
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({
  todo,
  testing,
  development,
  completed,
}) => {
  const total = todo + testing + development + completed;
  const todoWidth = (todo / total) * 100 + "%";
  const testingWidth = (testing / total) * 100 + "%";
  const developmentWidth = (development / total) * 100 + "%";
  const completedWidth = (completed / total) * 100 + "%";

  return (
    <div className="status-bar-box">
      <div className="status todo" style={{ width: todoWidth }}>
        {/* Content for 'todo' status */}
      </div>
      <div className="status testing" style={{ width: testingWidth }}>
        {/* Content for 'testing' status */}
      </div>
      <div className="status development" style={{ width: developmentWidth }}>
        {/* Content for 'development' status */}
      </div>
      <div className="status completed" style={{ width: completedWidth }}>
        {/* Content for 'completed' status */}
      </div>
    </div>
  );
};

export default ProjectStatus;
