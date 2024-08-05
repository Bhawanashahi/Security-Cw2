import React from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import Nav from "../Component/Header/Nav";

const NormalRoute = ({ Component }) => {
  const { pathname } = useLocation();
  const pathroad = matchPath("/", pathname);

  return (
    <div>
      <Nav />

      {pathroad ? <Component /> : <Outlet />}
    </div>
  );
};

export default NormalRoute;
