import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

    dispatch(registerUser(formData));
    setTimeout(() => {
      onSubmitProps.resetForm({ values: "" });
      onSubmitProps.setSubmitting(false);
    }, 1000);
  };

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
        User registration Form{" "}
      </h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validateOnMount>
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
                  type="button"
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
