import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../../Component/Card/Card";
import Loading from "../../Component/Loading/Loading";
import {
  fetchGetProductByCategory,
  fetchGetProducts,
} from "../../Redux/Product/action";

const Product = () => {
  let params = new URLSearchParams(document.location.search);
  let catId = params.get("id");

  console.log("iddddddddd", catId);

  const products = useSelector(
    (state) => state.product.catProduct,
    shallowEqual
  );
  const loading = useSelector((state) => state.product.isloading, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetProductByCategory(catId));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="py-2 text-xl text-center text-red-600"
      style={{ fontFamily: "cursive" }}
    >
      Explore our Cakes
      {products.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mb-5 mt-8">
          {products.map((prod) => {
            return <Card product={prod} />;
          })}
        </div>
      ) : (
        <h1 className="mt-16">No Product found</h1>
      )}
    </div>
  );
};

export default Product;
