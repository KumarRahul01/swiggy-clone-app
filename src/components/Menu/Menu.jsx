import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { CLOUDINARY_IMG_URL, IMG_SLUG_URL } from "../../utils/Constants";
import FoodMenuCard from "./FoodMenuCard";

const Menu = ({ menuData }) => {
  return (
    <>
      <div className="tracking-widest text-[16px] font-semibold text-center">
        MENU
      </div>

      {/* Search Div */}
      <div className="relative flex items-center justify-center bg-gray-100 border border-gray-100 py-3 rounded-xl my-5 cursor-pointer">
        <h1 className="text-[16px] font-semibold text-gray-600">
          Search for dishes
        </h1>
        <span className="absolute right-4">
          <IoIosSearch size={"1.25rem"} />
        </span>
      </div>

      {/* Restaurant Menu */}
      {menuData.map((menuItem, index) => {
        return (
          <div key={index}>
            <FoodMenuCard menuItem={menuItem} index={index} />
          </div>
        );
      })}
    </>
  );
};

export default Menu;
