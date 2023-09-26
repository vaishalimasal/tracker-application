import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import "@clayui/css/lib/css/atlas.css";

import SelectField from "./SelectField";
import projectApi from "../apis/projectApi";
import { useSelector } from "react-redux";
import { getAllProject } from "../store/slices/projectSlice";

import "./createIssue.css";

interface FormValues {
  sprint: any;
  summary: string;
  type: string;
  project: string;
  description: string;
  priority: string;
  assignee: string;
  tag: string;
  storyPoints: number;
}

const validationSchema = Yup.object().shape({
  summary: Yup.string().required("Summary is required"),
  type: Yup.string().required("Type is required"),
  project: Yup.string().required("Project is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  assignee: Yup.string().required("Assignee is required"),
  tag: Yup.string().required("Tag is required"),
  storyPoints: Yup.number()
    .required("Story Points are required")
    .positive("Story Points must be a positive number"),
});

const CreateIssue: React.FC = () => {
  const history = useHistory();
  const initialValues: FormValues = {
    summary: "",
    type: "",
    project: "",
    description: "",
    priority: "",
    assignee: "",
    tag: "",
    storyPoints: 0,
    sprint: undefined,
  };

  const typeOptions = [
    { label: "Bug", value: "1" },
    { label: "Task", value: "2" },
    { label: "Story", value: "3" },
  ];

  const projects = useSelector(getAllProject).allProject;
  const teamMembers = useSelector(getAllProject).teamMembers;

  const assigneeOptions = teamMembers.map((member: { name: any; id: any }) => ({
    label: member.name,
    value: member.id,
  }));

  const projectOptions = projects.map(
    (project: { projectName: any; projectID: any }) => ({
      label: project.projectName,
      value: project.projectID,
    })
  );

  const priorityOptions = [
    { label: "High", value: "1" },
    { label: "Medium", value: "2" },
    { label: "Low", value: "3" },
  ];

  const sprintOptions = [
    { label: "Sprint 1", value: "Sprint 1" },
    { label: "Sprint 2", value: "S3rint 2" },
    { label: "Sprint 3", value: "Sprint 3" },
  ];

  const tagOptions = [
    { label: "HU-22", value: "HU-22" },
    { label: "Angular track", value: "Angular track" },
    { label: "React track", value: "React track" },
    { label: "Java track", value: "Java track" },
  ];

  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    try {
      const projectData = {
        summary: values.summary,
        type: parseInt(values.type),
        projectID: values.project,
        description: values.description,
        priority: parseInt(values.priority),
        status: 1,
        assignee: values.assignee,
        tags: [values.tag],
        sprint: values.sprint,
        storyPoint: values.storyPoints,
      };

      const response = await projectApi.post("/issue", projectData);

      console.log("Project created successfully:", response);
      resetForm({ values: initialValues });
      history.push("/");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <h1 className="create-issue">Create Issue</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="form">
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="summary">Summary</label>
                <Field
                  type="text"
                  id="summary"
                  name="summary"
                  className="form-control"
                  placeholder="Summary"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="form-row">
              <SelectField label="Type" name="type" options={typeOptions} />
              <SelectField
                label="Project"
                name="project"
                options={projectOptions}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="form-row">
              <SelectField
                label="Priority"
                name="priority"
                options={priorityOptions}
              />
              <SelectField
                label="Assignee"
                name="assignee"
                options={assigneeOptions}
              />
            </div>

            <div className="form-row">
              <SelectField label="Tag" name="tag" options={tagOptions} />
              <SelectField
                label="Sprint"
                name="sprint"
                options={sprintOptions}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="storyPoints">Story Points</label>
                <Field
                  type="number"
                  id="storyPoints"
                  name="storyPoints"
                  className="form-control"
                  placeholder="0, 1, 2..."
                />
                <ErrorMessage
                  name="storyPoints"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="form-group form-grp-btn">
              <button type="submit" className="btn btn-primary btn-dark mr-2">
                Submit
              </button>
              <button type="reset" className="btn btn-secondary">
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateIssue;
