import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGetCategories } from "../../Redux/Category/action";
import { BaseUrl } from "../../Shared/BaseUrl";

const CakeList = () => {
  const category = useSelector(
    (state) => state.category.category,
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetCategories());
  }, []);
  return (
    <div class="mt-12 bg-clip-content p-6 border-4 border-red-200 rounded-xl border-dashed mx-2">
      <h1
        className="text-center text-red-600 text-xl"
        style={{ fontFamily: "cursive" }}
      >
        Cake List
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mb-5 mt-8">
        {category.map((cat) => {
          return (
            <Link key={cat._id} to={`/category?id=${cat._id}`}>
              <div className="bg-slate-100 p-3 py-6 w-full cursor-pointer hover:shadow-md rounded-md shadow-sm border border-slate-300">
                {/* img div */}
                <div className="flex justify-center h-36 md:h-48">
                  <img
                    src={`${BaseUrl}/${cat.image}`}
                    alt={cat.name}
                    className="h-full object-contain w-full"
                  />
                </div>

                {/* content div */}
                <div className=" mt-4 p-1">
                  <h1
                    className="text-sm md:text-base text-center overflow-hidden"
                    style={{ fontFamily: "cursive" }}
                  >
                    {cat.name}
                  </h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CakeList;
