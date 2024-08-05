import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Component/Button";
import FormikControl from "../../Component/Formik/FormikControl";
import Message from "../../Component/Message/Message";
import { removeLogin, userLogin } from "../../Redux/Login/action";

const Login = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const errMsg = useSelector((state) => state.login.errMsg, shallowEqual);
  const msg = useSelector((state) => state.login.message, shallowEqual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("role")
  );
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    setSuccessMsg(msg);
  }, [msg]);
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("role"));
  });
  useEffect(() => {
    setErrMessage(errMsg);
  }, [errMsg]);

  const onSubmit = (values, onSubmitProps) => {
    dispatch(userLogin(values));
    setTimeout(() => {
      onSubmitProps.setSubmitting(false);
    }, 1000);

    errMsg && setErrMessage(errMsg);
    successMsg && setSuccessMsg(msg);
  };

  useEffect(() => {
    return () => {
      dispatch(removeLogin());
    };
  }, []);

  useEffect(() => {
    isAuthenticated === "user" && navigate("/");
    isAuthenticated === "admin" && navigate("/admin-dashboard");
  });
  return (
    <section className="flex min-h-screen items-center justify-center gap-x-7 bg-white relative">
      {successMsg && (
        <Message
          className="flex justify-end gap-x-5 absolute top-2 right-5 shadow-md px-5 py-2 items-center bg-green-500 text-white rounded-md w-fit"
          message={successMsg}
          setMessage={setSuccessMsg}
        />
      )}

      {errMessage && (
        <Message
          className="flex justify-end gap-x-5 absolute top-2 right-5 shadow-md px-5 py-2 items-center bg-red-500 text-white rounded-md w-fit"
          message={errMessage}
          setMessage={setErrMessage}
        />
      )}
      <div className="lg:w-1/2 w-full flex items-center justify-center  ">
        <div className="w-full py-6 z-20">
          <h1 className="text-4xl tracking-wide font-serif text-center sm:text-start ">
            Welcome Back !!
          </h1>
          <p className="text-gray-400 mt-2 font-serif text-2xl text-center sm:text-start">
            Login to continue
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => (
              <Form>
                <div className="sm:w-3/5 w-full px-4 mt-8 lg:px-0 ">
                  <FormikControl
                    label="Email"
                    placeholder="Enter Your Emai"
                    control="input"
                    name="email"
                    type="email"
                  />
                  <div className="mt-5">
                    <FormikControl
                      label="Password"
                      placeholder="Enter Your Password"
                      control="input"
                      name="password"
                      type="password"
                    />
                  </div>
                  <Link to="/forget-password?forget-password" className="mt-2">
                    <h1 className="text-blue-600 hover:underline cursor-pointer">
                      Forgotten Password?
                    </h1>
                  </Link>
                  <div className="mt-5">
                    <Button
                      type="button"
                      className="bg-blue-500 py-2 tracking-wide hover:bg-blue-400 font-serif text-white w-full"
                      value="Login"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-5 w-3/5">
            <Link to="/register">
              <Button
                type="button"
                className="bg-green-500 py-2 tracking-wide hover:bg-green-400 font-serif text-white w-full"
                value="Create new Account"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
