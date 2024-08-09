import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLocation, matchPath } from "react-router-dom";
import Loading from "../Component/Loading/Loading";
import Header from "../Container/Admin/Header";
import Navbar from "../Container/Admin/Navbar";

const AdminRoutes = ({ Component }) => {
  const { pathname } = useLocation();
  const pathroad = matchPath("/admin-dashboard", pathname);

  const isAuthenticated = localStorage.getItem("role");
  const loading = useSelector((state) => state.login.isloading, shallowEqual);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, []);

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  });

  if (loading) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated || isAuthenticated !== "admin" ? (
        <Navigate to="/" replace={true} />
      ) : (
        isAuthenticated === "admin" && (
          <div
            className="w-full min-h-screen"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <Header />
            <div className="grid grid-cols-12">
              <div className="col-span-2 overflow-y-auto">
                <Navbar />
              </div>
              <div className="col-start-3 col-end-12">
                {pathroad ? <Component /> : <Outlet />}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
export default AdminRoutes;
