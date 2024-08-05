import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchAddCart } from "../../Redux/Cart/action";
import { fetchGetProductsById } from "../../Redux/Product/action";
import { BaseUrl } from "../../Shared/BaseUrl";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let params = new URLSearchParams(document.location.search);
  let prodId = params.get("id");
  const product = useSelector((state) => state.product.product, shallowEqual);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchGetProductsById(prodId));
  }, []);

  const addToCart = () => {
    const body = {
      userId: userId,
      productId: prodId,
      message: message,
      quantity: quantity,
    };
    dispatch(fetchAddCart(body));
  };

  return (
    <div className="bg-gray-100 px-5 py-24 w-full min-h-screen">
      <div className="flex items-center justify-end">
        <h1>Home</h1>
        <MdOutlineKeyboardArrowRight />
        <h1>{product?.name}</h1>
      </div>
      <div className="w-2/3 mx-auto mt-10 flex gap-x-20 py-4">
        <div className="w-9/12 h-80">
          <img
            src={`${BaseUrl}/${product?.image}`}
            alt="img"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full">
          <h1
            className="text-2xl text-green-500"
            style={{ fontFamily: "cursive" }}
          >
            {product?.name}
          </h1>
          <h1
            className="text-center text-red-500 text-xl"
            style={{ fontFamily: "cursive" }}
          >
            {product?.price}
          </h1>

          <div className="flex gap-x-8 mt-6">
            <h1>Description:</h1>
            <p className="text-justify">{product?.description}</p>
          </div>

          <div className="flex gap-x-20 mt-6">
            <h1>Type:</h1>
            <p className="text-justify">{product?.category?.name}</p>
          </div>

          <div className="flex gap-x-5 items-center mt-6">
            <div className="flex gap-x-12  items-center">
              <h1>Quantity:</h1>
              <input
                type="number"
                placeholder="Quantity (Pound)"
                className="px-2 py-1.5 outline-none rounded-sm"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <h1 className="text-sm text-red-300">Minimum Quantity: 1 Pound</h1>
          </div>

          <div className="flex gap-x-12 items-center w-full mt-6 pr-3">
            <h1>Message:</h1>
            <input
              type="test"
              className="px-2 py-2 w-full outline-none rounded-sm"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-center" onClick={addToCart}>
            <button className="border py-2 px-5 rounded-md bg-red-500 text-white text-center hover:bg-red-400">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
