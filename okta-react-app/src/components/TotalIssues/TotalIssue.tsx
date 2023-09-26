import React from "react";
import "./totalIssue.css";

interface TotalIssuesProps {
  title: string;
  count: number;
  className?: string;
}

const TotalIssues: React.FC<TotalIssuesProps> = ({
  title,
  count,
  className,
}) => {
  return (
    <div className={`total-issues`}>
      <div className="title">{title}</div>
      <h1 className={`${className}`}>{count}</h1>
    </div>
  );
};

export default TotalIssues;
