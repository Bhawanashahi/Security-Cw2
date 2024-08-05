import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const banners = [
  {
    id: 1,
    img: "/banner2.png",
    name: "banner 1",
  },
  {
    id: 2,
    img: "/banner-cake.jpg",
    name: "banner 2",
  },
  {
    id: 3,
    img: "/banner.png",
    name: "banner 3",
  },
];

const Banner = () => {
  const bannerSliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings} ref={bannerSliderRef}>
        {banners.map((banner) => {
          return (
            <div key={banner.id} className="px-2 h-28 sm:h-40 xl:h-72">
              <img
                src={banner.img}
                alt={banner.name}
                className="rounded-lg shadow-sm object-fill w-full h-full"
              />
            </div>
          );
        })}
      </Slider>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full container flex justify-between items-center text-listYourItems hover:text-listYourItemsHover text-2xl">
        <button
          className="bg-white rounded-full hover:bg-gray-200 md:ml-5"
          onClick={() => bannerSliderRef.current.slickPrev()}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button
          className="bg-white rounded-full hover:bg-gray-200 md:mr-5"
          onClick={() => bannerSliderRef.current.slickNext()}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Banner;
