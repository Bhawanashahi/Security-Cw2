import React from "react";
import { RxDashboard } from "react-icons/rx";
import { BiCategory } from "react-icons/bi";
import { BsFillCartPlusFill, BsCardChecklist } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../Redux/Login/action";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logouts = () => {
    dispatch(userLogout());
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="border-r border-gray-400 font-serif fixed left-0 top-16 overflow-y-auto h-full w-2/12 bg-white">
      <div className="mt-8">
        <Link to="/admin-dashboard">
          <div className="hover:bg-gray-200 px-5 py-1 cursor-pointer">
            <div className="flex items-center gap-x-8">
              <RxDashboard className="text-gray-600" size={22} />
              <h1 className="text-lg text-gray-700">Dashboard</h1>
            </div>
          </div>
        </Link>

        <Link to="/admin-dashboard/manage-category">
          <div className="hover:bg-gray-200 px-5 mt-5 py-1 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-x-8">
              <BiCategory className="text-gray-600" size={22} />
              <h1 className="text-lg text-gray-700">Category</h1>
            </div>
          </div>
        </Link>

        <Link to="/admin-dashboard/manage-product">
          <div className="hover:bg-gray-200 px-5 mt-5 py-1 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-x-8">
              <BsFillCartPlusFill className="text-gray-600" size={22} />
              <h1 className="text-lg text-gray-700">Products</h1>
            </div>
          </div>
        </Link>

        <Link to="/admin-dashboard/view-orders">
          <div className="hover:bg-gray-200 px-5 mt-5 py-1 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-x-8">
              <BsCardChecklist className="text-gray-600" size={22} />
              <h1 className="text-lg text-gray-700">Orders</h1>
            </div>
          </div>
        </Link>

        <div className="hover:bg-gray-200 px-5 mt-5 mb-32 py-1 cursor-pointer">
          <div className="flex items-center gap-x-8" onClick={logouts}>
            <IoMdExit className="text-gray-600" size={22} />
            <h1 className="text-lg text-gray-700">Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
