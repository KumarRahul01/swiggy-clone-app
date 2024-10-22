import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CLOUDINARY_IMG_URL } from "../../utils/Constants";
import { MdStars } from "react-icons/md";
import TopRestaurantFoodCard from "./TopRestaurantFoodCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TopRestraunt = () => {
  const data = useSelector((store) => store.app.data);

  const [title, setTitle] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    if (data) {
      setTitle(data?.data?.cards[1]?.card?.card?.header?.title || "");
      setRestaurant(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
    }
  }, [data]);

  const handlePrev = () => {
    if (translateValue <= 0) {
      setTranslateValue(0);
    } else {
      setTranslateValue((prev) => prev - 60);
    }
  };

  const handleNext = () => {
    setTranslateValue((prev) => prev + 60);
  };

  return (
    <>
      <div className="ml-8 mb-4">
        <div className="flex items-center justify-between mt-12 mb-8">
          <h1 className="text-2xl font-extrabold">{title}</h1>
          <div className="flex gap-6">
            <FaArrowLeft
              size={"1.65rem"}
              className={`${
                translateValue === 0
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-200 "
              } rounded-full p-1 cursor-pointer`}
              onClick={handlePrev}
            />
            <FaArrowRight
              size={"1.65rem"}
              className={`${
                translateValue >= 200
                  ? "bg-gray-200 text-gray-400"
                  : "bg-gray-200"
              } rounded-full p-1 cursor-pointer`}
              onClick={handleNext}
            />
          </div>
        </div>
        <div className="flex gap-10 mt-10 overflow-x-scroll scrolling">
          {restaurant &&
            restaurant.map((restaurant) => {
              const resdata = restaurant.info;
              const reslink = restaurant?.cta?.link;

              return (
                <div
                  key={resdata.id}
                  className="min-w-[268px] h-fit rounded-lg text-gray-900 cursor-pointer hover:scale-90 transition-all duration-300"
                  style={{ translate: `-${translateValue}rem` }}
                >
                  <TopRestaurantFoodCard resdata={resdata} reslink={reslink} />
                </div>
              );
            })}
        </div>
      </div>
      <hr className="border-[2px] ml-8" />
    </>
  );
};

export default TopRestraunt;
