import React from "react";
import { Field, ErrorMessage } from "formik";

interface SelectFieldProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options }) => {
  return (
    <div className="form-group col-md-6">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} className="form-control">
        <option value="" label={`Select ${label}`} />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default SelectField;
