import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../Formik/Error";

const InputField = ({ label, placeholder, name, ...rest }) => {
  return (
    <div className="text-sm">
      <label htmlFor={name} className="pb-1 flex items-center justify-between">
        {label} <ErrorMessage name={name} component={TextError} />
      </label>

      <Field
        id={name}
        name={name}
        {...rest}
        className="border border-gray-300 w-full p-2.5 rounded-md outline-gray-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
