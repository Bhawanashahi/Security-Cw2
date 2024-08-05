import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../Redux/Login/action";
import FormikControl from "../Formik/FormikControl";
import { FaCartArrowDown } from "react-icons/fa";
import { fetchGetCartByUser } from "../../Redux/Cart/action";
import AddToCart from "../AddToCart";

const Nav = () => {
  const [headerShadow, setHeaderShadow] = useState(false);

  const isAuthenticated = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const cartData = useSelector((state) => state.cart.cartData, shallowEqual);
  console.log("ssss", cartData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyShadow = () => {
    if (window.scrollY >= 30) {
      setHeaderShadow(true);
    } else {
      setHeaderShadow(false);
    }
  };

  window.addEventListener("scroll", applyShadow);

  const initialValues = {
    search: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("formik search value", values);

    setTimeout(() => {
      onSubmitProps.resetForm({ values: "" });
      onSubmitProps.setSubmitting(false);
    }, 1000);
  };

  const logouts = () => {
    dispatch(userLogout());
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchGetCartByUser(userId));
  }, [userId]);

  return (
    <header
      className={`bg-white border-b fixed w-full left-0 top-0 z-10 ${
        headerShadow ? "shadow-sm" : " "
      } `}
    >
      <div className="mx-10 grid grid-cols-12 place-items-center py-4 gap-x-7">
        <div className="px-3 col-span-2">
          <Link to="/">
            <h1>Cake Hub</h1>
          </Link>
        </div>
        <div className="col-span-4 w-full">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => (
              <Form>
                <div>
                  <FormikControl
                    placeholder="Search"
                    control="input"
                    name="search"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-start-7 col-end-13 w-full">
          <div className="flex justify-end gap-x-8 items-center">
            <Link to="/" className="hover:text-red-300">
              Home
            </Link>

            <Link className="hover:text-red-300">Category</Link>
            {isAuthenticated ? (
              <h1
                className="hover:text-red-300 cursor-pointer"
                onClick={logouts}
              >
                Logout
              </h1>
            ) : (
              <Link to="/login" className="hover:text-red-300">
                Login
              </Link>
            )}

            {isAuthenticated && (
              <>
                <Link to="/cart" className="flex items-center gap-x-3">
                  <FaCartArrowDown
                    className="text-red-300 cursor-pointer"
                    size={25}
                  />
                  <span className="rounded-full px-2 bg-red-100 text-white">
                    {cartData.length}
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
