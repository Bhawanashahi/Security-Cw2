import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchGetCartByUser } from "../../Redux/Cart/action";
import { BaseUrl } from "../../Shared/BaseUrl";

const AddToCart = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cart.cartData, shallowEqual);

  useEffect(() => {
    dispatch(fetchGetCartByUser(userId));
  }, [userId]);
  return (
    <div className="bg-gray-100 px-5 py-24 w-full min-h-screen">
      <div className="w-2/3 mx-auto border">
        <h1 className="text-center">Your Cart</h1>

        {cartData.map((product) => {
          return (
            <div className="w-full mt-10 flex gap-x-20 py-4">
              <div className="w-9/12 h-80">
                <img
                  src={`${BaseUrl}/${product?.productId.image}`}
                  alt="img"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-full">
                <h1
                  className="text-2xl text-green-500"
                  style={{ fontFamily: "cursive" }}
                >
                  {product?.productId.name}
                </h1>
                <h1
                  className="text-center text-red-500 text-xl"
                  style={{ fontFamily: "cursive" }}
                >
                  {product?.productId.price}
                </h1>

                <div className="flex gap-x-8 mt-6">
                  <h1>Description:</h1>
                  <p className="text-justify">
                    {product?.productId.description}
                  </p>
                </div>

                <div className="flex gap-x-20 mt-6">
                  <h1>Type:</h1>
                  <p className="text-justify">{product?.category?.name}</p>
                </div>

                <div className="flex gap-x-5 items-center mt-6">
                  <div className="flex gap-x-12  items-center">
                    <h1>Quantity:</h1>
                    <span>{product.quantity}</span>
                  </div>
                </div>

                <div className="flex gap-x-12 items-center w-full mt-6 pr-3">
                  <h1>Message:</h1>
                  <span>{product.message}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddToCart;
