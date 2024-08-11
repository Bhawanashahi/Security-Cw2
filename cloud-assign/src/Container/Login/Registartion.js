import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup for validation schema
import Button from "../../Component/Button";
import FormikControl from "../../Component/Formik/FormikControl";
import Message from "../../Component/Message/Message";
import Image from "../../Component/UploadImage/Image";
import { registerUser } from "../../Redux/Login/action";

const Registartion = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const msg = useSelector((state) => state.login.message, shallowEqual);

  useEffect(() => {
    setMessage(msg);
  }, [msg]);

  const initialValues = {
    profile: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    userRole: "",
    password: "",
  };
  const commonWords = ["password", "123456", "qwerty", "name", "admin", "user"];
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be 8-12 characters")
      .max(12, "Password must be 8-12 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .notOneOf(
        commonWords,
        "Password is too common or contains easily guessed words. Please choose a stronger password."
      )
      .test(
        "personal-info-check",
        "Password should not contain personal information (first name, last name, or email)",
        function(value) {
          const { firstName, lastName, email } = this.parent;
          const personalInfo = [firstName, lastName, email.split("@")[0]];
          return !personalInfo.some(info => value.includes(info));
        }
      )
      .required("Password is required"),
    // Add other field validations if needed
  });
  
  

  const onSubmit = (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("profile", values.profile);
    formData.append("firstName", values.firstName);
    formData.append("middleName", values.middleName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role", "user");
    formData.append("userRole", "user");
    formData.append("password", values.password);


  return (
    <div className="bg-gray-100 px-5 py-24 w-full min-h-screen">
      {message && (
        <Message
          className="flex justify-end absolute right-0 shadow-md px-3 py-2 items-center bg-green-500 text-white rounded-md w-fit"
          message={message}
          setMessage={setMessage}
        />
      )}
      <h1 className="text-center py-3 text-2xl text-red-300">
        User registration Form
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Apply the validation schema
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <div className="w-2/3 mx-auto">
              <div className="grid grid-cols-12">
                <div className="col-span-3 h-full">
                  <div className="p-3 h-full">
                    <Image
                      onChange={(e) =>
                        formik.setFieldValue("profile", e.target.files[0])
                      }
                      file={formik.values.profile}
                    />
                  </div>
                </div>
                <div className="col-start-4 col-end-13">
                  <div className="flex gap-x-5 w-full mt-4 px-7">
                    <div className="w-full">
                      <FormikControl
                        label="First Name"
                        placeholder="First Name"
                        control="input"
                        name="firstName"
                      />
                    </div>

                    <div className="w-full">
                      <FormikControl
                        label="Middle Name"
                        placeholder="Middle Name"
                        control="input"
                        name="middleName"
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-5 w-full mt-8 px-7">
                    <div className="w-full">
                      <FormikControl
                        label="Last Name"
                        placeholder="Last Name"
                        control="input"
                        name="lastName"
                      />
                    </div>

                    <div className="w-full">
                      <FormikControl
                        label="Email Address"
                        placeholder="Email Address"
                        control="input"
                        name="email"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-5 w-full mt-8 px-7">
                    <div className="w-full">
                      <FormikControl
                        label="Contact Number"
                        placeholder="Contact Number"
                        control="input"
                        name="phone"
                        type="number"
                      />
                    </div>

                    <div className="w-full">
                      <FormikControl
                        label="Password"
                        placeholder="Password"
                        control="input"
                        name="password"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 w-1/5 mx-auto ">
                <Button
                  type="submit"
                  className="bg-blue-500 py-2 tracking-wide hover:bg-blue-400 font-serif text-white w-full"
                  value="Submit"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registartion;
