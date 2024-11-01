import React from "react";
import { Link, useLocation } from "react-router-dom";
import TopRestaurantFoodCard from "../TopRestraunt/TopRestaurantFoodCard";

const SearchPageItem = () => {
  const location = useLocation();
  const { data } = location.state || {}; // Accessing the passed data
  console.log(data);

  return (
    <>
      <div className="flex gap-20 items-center justify-center max-w-[800px] mx-auto bg-gray-200 my-20">
        <div className="max-w-[272px] bg-yellow-300 -ml-96">
          <TopRestaurantFoodCard
            resdata={data.resInfo}
            reslink={data.resLink}
          />
        </div>
        <button className="bg-[#f35200] text-gray-200 px-4 py-1 font-semibold tracking-wide rounded-sm">
          Visit Restaurant
        </button>
      </div>
    </>
  );
};

export default SearchPageItem;
