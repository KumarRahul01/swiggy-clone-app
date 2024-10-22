import React, { useState, useEffect, useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../Store/dataSlice";
import { IMG_SLUG_URL } from "../../utils/Constants";
import { LocationContext } from "../context/LocationContext";
import { Navigate, useNavigate } from "react-router-dom";

const FoodNavbar = () => {
  const navigate = useNavigate();
  const { lat, lng } = useContext(LocationContext);

  const [foodItemNav, setfoodItemNav] = useState([]);
  const [title, setTitle] = useState("");
  const [translateValue, setTranslateValue] = useState(0);

  const data = useSelector((store) => store.app.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllData({ lat: lat || "28.7040592", lng: lng || "77.10249019999999" })
    );
  }, [lat, lng]);

  useEffect(() => {
    setTitle(data?.data?.cards?.[0]?.card?.card?.header?.title || ""); // Default to empty string if undefined
  }, [data]);

  useEffect(() => {
    if (data === "Location Unserviceable") {
      navigate("/404");
    }
    setfoodItemNav(
      data?.data?.cards?.[0]?.card?.card?.imageGridCards?.info || []
    );
  }, [data]);

  const handlePrev = () => {
    if (translateValue <= 0) {
      setTranslateValue(0);
    } else {
      setTranslateValue((prev) => prev - 60);
    }
  };

  const handleNext = () => {
    if (translateValue >= 150) {
      setTranslateValue(150); // Adjust based on item width and gap
    } else {
      setTranslateValue((prev) => prev + 60);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <h1 className="ml-8 font-extrabold text-2xl py-4">{title}</h1>

        <div className="flex gap-4">
          <FaArrowLeft
            size={"1.65rem"}
            className={`${
              translateValue === 0 ? "bg-gray-200 text-gray-400" : "bg-gray-200"
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

      <div
        className={`flex gap-6 overflow-x-scroll px-10 scrolling transition-all duration-700`}
      >
        {foodItemNav.length > 0 ? (
          foodItemNav.map((item) => (
            <img
              key={item.id}
              src={`${IMG_SLUG_URL}${item.imageId}`}
              alt="food-img"
              className={`w-[9rem] cursor-pointer transition-all duration-700`}
              style={{ transform: `translateX(-${translateValue}rem)` }}
            />
          ))
        ) : (
          <p className="text-center w-full">Loading...</p> // Display this if foodItemNav is empty
        )}
      </div>
      <hr className="border-[1px] m-10" />
    </>
  );
};

export default FoodNavbar;
