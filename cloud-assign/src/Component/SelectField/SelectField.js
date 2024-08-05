import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../Formik/Error";

const SelectField = ({ label, name, options, setprovinceid, ...rest }) => {
  return (
    <div className="text-sm">
      <label htmlFor={name} className="pb-1 flex items-center justify-between">
        {label} <ErrorMessage name={name} component={TextError} />
      </label>

      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="border border-gray-300 w-full p-2.5 rounded-md outline-gray-300"
      >
        {options?.map((option) => {
          return (
            <option
              key={option._id}
              value={option.name}
              onChange={() => setprovinceid(option._id)}
            >
              {option.name}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export default SelectField;
