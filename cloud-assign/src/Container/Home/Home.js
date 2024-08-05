import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../../Component/Card/Card";
import Banner from "./Banner";
import CakeList from "./CakeList";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  fetchGetProducts,
  fetchGetRecentlyAdded,
} from "../../Redux/Product/action";

const Home = () => {
  const products = useSelector((state) => state.product.products, shallowEqual);
  const recently = useSelector(
    (state) => state.product.recentlyAdded,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProducts());
    dispatch(fetchGetRecentlyAdded());
  }, []);

  const sliderRef = useRef(null);

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={className}>
        <MdOutlineKeyboardArrowLeft className="bg-white shadow-md rounded-full text-red-300 hover:text-red-400" />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={className}>
        <MdOutlineKeyboardArrowRight className="bg-white shadow-md rounded-full text-red-300 hover:text-red-400" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: true,
        },
      },

      {
        breakpoint: 839,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 659,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 555,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 356,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 px-5 py-24 w-full min-h-screen">
      <Banner />
      <CakeList />

      {/* newly added Products */}
      <div className="mx-2 mb-5 mt-8 ">
        <h1 className="pb-3 px-1 text-xl">Newly Added</h1>
        <Slider {...settings} ref={sliderRef}>
          {recently.map((product) => (
            <div className="px-1">
              <Card const product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* featured products */}
      <div className="mx-2 mb-5 mt-8 ">
        <h1 className="pb-3 px-1 text-xl">Featured Cakes</h1>
        <Slider {...settings} ref={sliderRef}>
          {products.map((product) => (
            <div className="px-1">
              <Card const product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
