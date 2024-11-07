import React, { useEffect } from "react";
import { CLOUDINARY_IMG_URL } from "../../utils/Constants";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";

const TopRestaurantFoodCard = ({ resdata, reslink }) => {
  return (
    <Link to={`/restaurant-menu/${reslink.split("/").at(-1)}`}>
      <div href="#" className="relative" key={resdata.id}>
        <img
          className={`rounded-xl aspect-[3/2] h-[182px] object-cover shadow-md`}
          src={`${CLOUDINARY_IMG_URL}${resdata.cloudinaryImageId}`}
          alt={resdata.name}
          title={resdata.name}
        />

        {/* Discount Offers */}
        <div className="absolute bottom-0 w-full">
          <h3 className="text-2xl rounded-b-xl font-extrabold tracking-tight text-white px-4 bg-gradient-to-t from-gray-900 from-20% to-transparent to-100% line-clamp-1">
            {resdata.aggregatedDiscountInfoV3
              ? resdata.aggregatedDiscountInfoV3?.header +
                " " +
                (resdata.aggregatedDiscountInfoV3?.subHeader
                  ? resdata.aggregatedDiscountInfoV3?.subHeader
                  : resdata.aggregatedDiscountInfoV3?.discountTag ||
                    "UPTO ₹ 200")
              : "20% OFF UPTO ₹ 200"}
          </h3>
        </div>
      </div>
      <div className="py-2 pl-2">
        {/* Restaurant Name */}
        <h3 className="text-2xl font-bold tracking-tight line-clamp-1">
          {resdata.name.length > 18
            ? resdata.name.slice(0, 18) + "..."
            : resdata.name}
        </h3>

        {/* Rating & Delivery Time */}
        <div className="flex items-center gap-1 font-semibold">
          <MdStars size="1.25rem" className="text-green-700" />{" "}
          <h3>{resdata.avgRating}</h3>
          <div className="h-1 w-1 rounded-full bg-black"></div>
          <h3>{resdata.sla?.slaString}</h3>
        </div>

        {/* Cuisine */}
        <div className="font-medium text-gray-600 line-clamp-1">
          {/* {resdata.cuisines.slice(0, 3).join(", ")} */}
          {resdata.cuisines.length > 2
            ? resdata.cuisines.slice(0, 2).join(", ")
            : resdata.cuisines}
        </div>

        {/* Area Name */}
        <h3 className="font-medium text-gray-600 capitalize">
          {resdata.areaName}
        </h3>
      </div>
    </Link>
  );
};

export default TopRestaurantFoodCard;
