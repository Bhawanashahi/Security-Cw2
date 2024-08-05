import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../Shared/BaseUrl";

const Card = ({ product }) => {
  const isAuthenticated = localStorage.getItem("role");
  return (
    <div className="bg-slate-100 h-80 p-4 w-full cursor-pointer hover:shadow-md rounded-md shadow-sm border border-slate-300 card">
      {/* img div */}
      <Link to={`/product?id=${product._id}`}>
        <div className="flex justify-center h-36 md:h-52 img">
          <img
            src={`${BaseUrl}/${product.image}`}
            alt={product.name}
            className="h-full object-cover w-full"
          />
        </div>

        <div className=" mt-4 p-1 title">
          <h1
            className="text-sm md:text-base text-center overflow-hidden"
            style={{ fontFamily: "cursive" }}
          >
            {product.name}
          </h1>
        </div>

        <div className=" mt-2 p-1 title">
          <h1
            className="text-sm text-red-300 md:text-base text-center overflow-hidden"
            style={{ fontFamily: "cursive" }}
          >
            Rs. {product.price}
          </h1>
        </div>

        <div className=" mt-9 hidden cart w-fit rounded-full bg-white p-2 hover:bg-red-100">
          <h1 className="text-sm text-red-300 flex justify-center items-center md:text-base text-center overflow-hidden">
            <AiOutlineShoppingCart className="text-3xl text-center" />
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Card;
