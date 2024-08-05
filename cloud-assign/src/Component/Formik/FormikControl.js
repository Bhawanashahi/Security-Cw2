import React from "react";
import InputField from "../InputField";
import SelectField from "../SelectField/SelectField";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputField {...rest} />;
    case "select":
      return <SelectField {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
