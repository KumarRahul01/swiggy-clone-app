import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../Store/dataSlice";
import { IMG_SLUG_URL } from "../../utils/Constants";

const FoodNavbar = () => {
  const [foodItemNav, setfoodItemNav] = useState([]);
  const [title, setTitle] = useState("");
  const [translateValue, setTranslateValue] = useState(0);

  const data = useSelector((state) => state.app.data);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getAllData());
    } catch (error) {
      console.log(error.message);
    }
  }, [data]);

  useEffect(() => {
    // console.log(data);

    setTitle(data?.data?.cards[0].card?.card?.header?.title);
    if (data != "") {
      setfoodItemNav(data?.data?.cards[0].card?.card?.imageGridCards?.info);
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
    // if (translateValue >= 120) {
    //   setTranslateValue(156);
    // } else {
    //   setTranslateValue((prev) => prev + 60);
    // }
    setTranslateValue((prev) => prev + 60);
  };

  // console.log(translateValue);

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <h1 className="ml-8 font-extrabold text-2xl py-4">{title}</h1>

        <div className="flex gap-4">
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
              translateValue >= 150
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-200"
            } rounded-full p-1 cursor-pointer`}
            onClick={handleNext}
          />
        </div>
      </div>
      <div className={`flex gap-6 overflow-x-scroll px-10 scrolling`}>
        {foodItemNav.length > 0 &&
          foodItemNav.map((item) => (
            <img
              key={item.id}
              src={`${IMG_SLUG_URL}${item.imageId}`}
              alt={item.restaurantName}
              className={`w-[9rem] cursor-pointer transition-all duration-700`}
              style={{ translate: `-${translateValue}rem` }}
            />
          ))}
      </div>
      <hr className="border-[1px] m-10" />
    </>
  );
};

export default FoodNavbar;
