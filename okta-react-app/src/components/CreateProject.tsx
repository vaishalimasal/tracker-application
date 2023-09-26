import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import "@clayui/css/lib/css/atlas.css";

import SelectField from "./SelectField";
import projectApi from "../apis/projectApi";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../store/slices/projectSlice";

import "./createProject.css";

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project Name is required"),
  owner: Yup.string().required("Owner is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be later than Start Date"),
});
interface FormValues {
  projectName: string;
  owner: string;
  startDate: string;
  endDate: string;
}

const CreateProject = () => {
  const history = useHistory();

  const teamMembers = useSelector(getAllProject).teamMembers;
  const ownerOptions = teamMembers.map(
    (member: { name: string; id: number }) => ({
      label: member.name,
      value: member.id,
    })
  );

  const initialValues = {
    projectName: "",
    owner: "",
    startDate: "",
    endDate: "",
  };

  const handleSubmit = async (
    values: FormValues,

    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const projectData = {
        projectName: values.projectName,
        projectOwner: parseInt(values.owner),
        projectStartDate: values.startDate + "T12:00:00Z",
        projectEndDate: values.endDate + "T12:00:00Z",
      };
      console.log("Values", values);
      const response = await projectApi.post("/project", projectData);
      console.log("projectData:..", projectData);
      console.log("Project created successfully:", response.data);

      resetForm();

      history.push("/");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <h1 className="create-project">Create Project</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="form">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="projectName">Project Name</label>

                <Field
                  type="text"
                  id="projectName"
                  name="projectName"
                  className="form-control"
                  placeholder="Project Name"
                />

                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <SelectField
                label="Owner"
                name="owner"
                options={ownerOptions}
              ></SelectField>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="startDate">Project Start Date</label>

                <Field
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                />

                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="endDate">Project End Date</label>

                <Field
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                />

                <ErrorMessage
                  name="endDate"
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

export default CreateProject;
