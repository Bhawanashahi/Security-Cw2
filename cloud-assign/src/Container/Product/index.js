import React, { useEffect } from "react";
import Filter from "./Filter";
import Product from "./Product";

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-100 py-20 w-full relative">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Filter />
        </div>
        <div className="col-start-3 col-end-13 mx-3 px-3">
          <Product />
        </div>
      </div>
    </div>
  );
};

export default Products;
