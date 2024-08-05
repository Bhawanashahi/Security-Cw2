import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Breadcrum = ({ value }) => {
  return (
    <div className="flex items-center justify-end">
      <Link to="/admin-dashboard">
        <h1 className="text-red-300 cursor-pointer">Dashboard</h1>
      </Link>
      <IoIosArrowForward className="m-1 text-gray-500" />
      <p className=" text-gray-500">{value}</p>
    </div>
  );
};

export default Breadcrum;
