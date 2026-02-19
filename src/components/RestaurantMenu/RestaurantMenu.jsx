import React, { act, useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart, MdStars } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Discounts from "../Discount/Discounts";
import Menu from "../Menu/Menu";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { LocationContext } from "../context/LocationContext";
import TopPicks from "../TopPicks/TopPicks";

const RestaurantMenu = () => {
  const obj = useParams();
  const strId = obj.slug.split("-").at(-1);

  const resId = strId.match(/\d+/)[0];

  const [resInfo, setResInfo] = useState([]);
  const [topMenuData, setTopMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);
  const [topPicks, setTopPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { lat, lng } = useContext(LocationContext);

  async function fetchData() {
    const res = await fetch(
      // `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${
      //   lat || "28.7040592"
      // }&lng=${
      //   lng || "77.10249019999999"
      // }&restaurantId=${resId}&submitAction=ENTER`

      `https://food-delivery-cors.vercel.app/api/proxy/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${
        lat || "28.7040592"
      }&lng=${
        lng || "77.10249019999999"
      }&restaurantId=${resId}&submitAction=ENTER`
    );
    const data = await res.json();
    console.log(data)
    setLoading(false);

    setResInfo(data?.data?.cards[2].card?.card?.info);
    setDiscountData(
      data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    let searchNum = 0;
    if (data.data.cards.length === 6) {
      searchNum = 5;
    } else {
      searchNum = 4;
    }

    setTopMenuData(
      data?.data?.cards[searchNum]?.groupedCard?.cardGroupMap?.REGULAR.cards
    );

    if (
      data?.data?.cards[searchNum]?.groupedCard?.cardGroupMap?.REGULAR.cards[1]
        .card.card.title === "Top Picks"
    ) {
      setTopPicks(
        data?.data?.cards[searchNum]?.groupedCard?.cardGroupMap?.REGULAR
          .cards[1].card.card.carousel
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrev = () => {
    if (translateValue <= 0) {
      setTranslateValue(0);
    } else {
      setTranslateValue((prev) => prev - 20);
    }
  };

  const handleNext = () => {
    if (translateValue >= 60) {
      setTranslateValue(60); // Adjust based on item width and gap
    } else {
      setTranslateValue((prev) => prev + 20);
    }
  };

  const cartItems = useSelector((store) => store.cart.cartData);
  const navigate = useNavigate();
  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      {loading ? (
        <>
          <div className="max-w-[800px] mx-auto p-5 md:p-0">
            <div className="bg-gray-300 h-5 md:my-4 my-1 md:w-1/4 w-1/2 animate-pulse"></div>
            <div className="bg-gray-300 h-10 md:w-1/3 w-[80%] animate-pulse my-8"></div>
            <div className="bg-gray-300 h-48 w-full animate-pulse mb-6"></div>
            <div className="bg-gray-300 h-10 mt-4 md:w-1/3 w-[80%] animate-pulse mb-8"></div>
            <div className="flex gap-4 overflow-hidden my-6">
              <div className="min-w-[328px] h-[76px] bg-gray-300 rounded-xl"></div>
              <div className="min-w-[328px] h-[76px] bg-gray-300 rounded-xl"></div>
              <div className="min-w-[328px] h-[76px] bg-gray-300 rounded-xl"></div>
            </div>
            <div className="flex gap-4">
              <div className="bg-gray-300 h-56 md:w-1/2 min-w-[272px] rounded-md animate-pulse"></div>
              <div className="bg-gray-300 h-56 md:w-1/2 min-w-[272px] rounded-md animate-pulse"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full md:relative block px-5">
            <div className="md:w-[800px] mx-auto my-5">
              <p className="text-xs font-light">
                <Link to={"/"} className="text-gray-500 hover:text-gray-950">
                  Home
                </Link>{" "}
                /{" "}
                <Link to={"/"} className="text-gray-500 hover:text-gray-950">
                  {resInfo.city}
                </Link>{" "}
                /{" "}
                <span className="text-gray-900 font-medium">
                  {resInfo.name}
                </span>
              </p>

              <h1 className="text-2xl font-extrabold mt-12 mb-4">
                {resInfo.name}
              </h1>

              {/* Restaurant Card */}
              <div className="w-full rounded-3xl bg-gradient-to-t from-gray-300 p-5">
                <div className="w-full h-full border border-gray-300 bg-white rounded-2xl p-5">
                  <div className="flex items-center font-bold gap-2">
                    <MdStars size="1.25rem" className="text-green-700" />
                    <span>{resInfo.avgRating}</span>
                    <span>({resInfo.totalRatingsString})</span>
                    <span className="h-1 w-1 rounded-full hidden md:inline-block md:mb-0 bg-gray-500"></span>
                    <span className="hidden md:block">
                      {resInfo.costForTwoMessage}
                    </span>
                  </div>

                  {/* cuisines */}
                  <div>
                    <p className="font-bold underline text-[#fe5200] py-1 text-[15px] tracking-tight mt-2 line-clamp-1">
                      {resInfo.cuisines?.join(", ")}
                    </p>
                  </div>

                  {/* Outlet & Timings */}
                  <div className="flex items-center gap-4 line-clamp-1">
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
              {/* Deals For You */}
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="font-extrabold text-2xl py-4">
                    Deals for you
                  </h1>

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
                        translateValue >= 60
                          ? "bg-gray-200 text-gray-400"
                          : "bg-gray-200"
                      } rounded-full p-1 cursor-pointer`}
                      onClick={handleNext}
                    />
                  </div>
                </div>
                <div
                  className={`flex gap-4 overflow-x-scroll md:ml-[6px] scrolling mb-6 `}
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
                  <div className="tracking-widest text-[16px] font-semibold text-center">
                    MENU
                  </div>

                  {/* Search Div */}
                  {/* <div className="relative flex items-center justify-center bg-gray-100 border border-gray-100 py-3 rounded-xl my-5 cursor-pointer">
                    <h1 className="text-[16px] font-semibold text-gray-600">
                      Search for dishes
                    </h1>
                    <span className="absolute right-4">
                      <IoIosSearch size={"1.25rem"} />
                    </span>
                  </div> */}

                  {/* Top-Picks */}
                  {topPicks.length > 0 && <TopPicks data={topPicks} />}

                  {/* Menu */}
                  <Menu topMenuData={topMenuData} />
                </div>
              </div>
            </div>

            {/* Cart Logo on right side */}
            <div
              className={`${
                cartItems.length > 0 ? "fixed animate-bounce" : "hidden"
              } md:bottom-20 bottom-10 md:right-20 right-6 cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-all duration-300`}
              onClick={cartHandler}
            >
              <div className="relative">
                <MdOutlineShoppingCart size={"2.5rem"} />
              </div>
              <div
                className={`top-0 right-3 text-sm font-bold rounded-full text-gray-100 bg-[#fe5200] px-2 ${
                  cartItems.length === 0 ? "hidden" : "absolute"
                }`}
              >
                {cartItems.length}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantMenu;
