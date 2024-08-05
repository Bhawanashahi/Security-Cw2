import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchGetCategories } from "../../Redux/Category/action";

const Filter = () => {
  return (
    <div className="fixed w-2/12 bg-white border-r overflow-y-hidden hover:overflow-y-auto h-screen">
      <h1
        className="text-center py-2 text-xl"
        style={{ fontFamily: "cursive" }}
      >
        Filter
      </h1>
      <hr className="border-dotted mt-1 border-red-500" />

      <div className="px-5 mt-4 ">
        <h1 className="font-medium text-sm md:text-base">Price</h1>
        <div className="flex space-x-4 mt-3 w-full">
          <div className="border w-full bg-white">
            <input
              type="number"
              placeholder="Min Price"
              name="minPrice"
              className="px-3 py-2 w-full text-xs outline-none bg-transparent"
            />
          </div>
          <div className="border w-full bg-white">
            <input
              type="number"
              placeholder="Max Price"
              name="maxPrice"
              className="px-3 py-2 w-full text-xs outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10 px-5">
        <div className="rounded-md w-5/12 text-center bg-red-300 text-white p-1.5 cursor-pointer hover:bg-gray-200 duration-300">
          <button className="font-medium opacity-75">Clear</button>
        </div>
        <div className="rounded-md w-5/12 bg-blue-300 text-white text-center p-1.5 cursor-pointer bg-listYourItemsHover hover:bg-gray-200 duration-300">
          <button className="font-medium opacity-75">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
