import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IMG_SLUG_URL } from "../../utils/Constants";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/CartSlice";

const TopPicks = ({ data }) => {
  const [translateValue, setTranslateValue] = useState(0);
  const dispatch = useDispatch();

  const handlePrev = () => {
    if (translateValue <= 0) {
      setTranslateValue(0);
    } else {
      setTranslateValue((prev) => prev - 20);
    }
  };

  const handleNext = () => {
    setTranslateValue((prev) => prev + 20);
  };

  const addItemToCart = ({ id, name, imageId, price, quantity }) => {
    dispatch(addItem({ id, name, imageId, price, quantity }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className=" font-extrabold text-2xl py-4">Top Picks</h1>

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
              translateValue >= 70 ? "bg-gray-200 text-gray-400" : "bg-gray-200"
            } rounded-full p-1 cursor-pointer`}
            onClick={handleNext}
          />
        </div>
      </div>
      <div className={`flex gap-4 w-full overflow-x-scroll scrolling`}>
        {data.map((data, i) => {
          const { creativeId } = data;
          const id = data.dish.info.id;
          const price = data.dish.info.price || data.dish.info.defaultPrice;
          const imageId = data.dish.info.imageId;
          const name = data.dish.info.name;
          const quantity = 1;

          return (
            <div
              key={i}
              className="w-[340px] min-w-[340px] transition-all duration-700 relative"
              style={{ translate: `-${translateValue}rem` }}
            >
              <img
                className="w-full object-cover"
                src={IMG_SLUG_URL + creativeId}
                alt="img"
              />

              <div className="absolute w-full px-6 bottom-8">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-100">
                    ₹ {price / 100}
                  </h3>
                  <button
                    className="px-6 py-1 bg-gray-100 text-green-600 rounded-md font-extrabold"
                    onClick={() =>
                      addItemToCart({ imageId, quantity, name, id, price })
                    }
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPicks;
