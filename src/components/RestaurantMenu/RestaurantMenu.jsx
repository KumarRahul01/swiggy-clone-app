import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { IMG_SLUG_URL } from "../../utils/Constants";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Discounts from "../Discount/Discounts";
import Menu from "../Menu/Menu";

const RestaurantMenu = () => {
  const obj = useParams();
  const strId = obj.slug.split("-").at(-1);

  const resId = strId.match(/\d+/)[0];

  const [resInfo, setResInfo] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);

  let dataFetched = false;

  async function fetchData() {
    const res = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${resId}&submitAction=ENTER`
    );
    const data = await res.json();
    dataFetched = true;
    // Filter out the actual menu cards
    const actualMenuData =
      (data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );

    setResInfo(data?.data?.cards[2].card?.card?.info);
    setDiscountData(
      data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setMenuData(actualMenuData);
  }

  useEffect(() => {
    fetchData();
  }, [dataFetched]);

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

  return (
    <>
      <div className="w-full">
        <div className="w-[800px] mx-auto my-5">
          <p className="text-xs font-light">
            <Link to={"/"} className="text-gray-500 hover:text-gray-950">
              Home
            </Link>{" "}
            /{" "}
            <Link to={"/"} className="text-gray-500 hover:text-gray-950">
              {resInfo.city}
            </Link>{" "}
            / <span className="text-gray-900 font-medium">{resInfo.name}</span>
          </p>

          <h1 className="text-2xl font-extrabold mt-12 mb-4">{resInfo.name}</h1>
          <div className="w-full rounded-3xl bg-gradient-to-t from-gray-300 p-5">
            <div className="w-full h-full border border-gray-300 bg-white rounded-2xl p-5">
              <div className="flex items-center font-bold gap-1">
                <MdStars size="1.25rem" className="text-green-700" />
                <span>{resInfo.avgRating}</span>
                <span>({resInfo.totalRatingsString})</span>
                <span className="h-1 w-1 rounded-full bg-gray-500"></span>
                <span>{resInfo.costForTwoMessage}</span>
              </div>

              {/* cuisines */}
              <div>
                <p className="font-bold underline text-[#fe5200] py-1 text-[15px] tracking-tight">
                  {resInfo.cuisines?.join(", ")}
                </p>
              </div>

              {/* Outlet & Timings */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col justify-center items-center w-2 my-4">
                  <div className="w-[7px] h-[7px] bg-gray-300 rounded-full"></div>
                  <div className="w-[1.7px] h-7 bg-gray-300"></div>
                  <div className="w-[7px] h-[7px] bg-gray-300 rounded-full flex items-center justify-center"></div>
                </div>
                {/* Text */}
                <div className="flex flex-col gap-3 text-sm">
                  <p>
                    <span className="font-bold">Outlet</span>{" "}
                    <span className="pl-2">{resInfo.locality}</span>
                  </p>
                  <p className="font-bold">60-65 mins</p>
                </div>
              </div>
            </div>
          </div>
          {/* Deals */}
          <div>
            <div className="flex items-center justify-between">
              <h1 className=" font-extrabold text-2xl py-4">Deals for you</h1>

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
                    translateValue >= 70
                      ? "bg-gray-200 text-gray-400"
                      : "bg-gray-200"
                  } rounded-full p-1 cursor-pointer`}
                  onClick={handleNext}
                />
              </div>
            </div>
            <div
              className={`flex gap-4 overflow-x-scroll ml-[6px] scrolling mb-6`}
            >
              {discountData.map((data, i) => (
                <Discounts
                  data={data}
                  key={i}
                  translateValue={translateValue}
                />
              ))}
            </div>

            {/* Menu */}
            <div className="py-5 ">
              <Menu menuData={menuData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
