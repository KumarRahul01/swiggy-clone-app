import React, { useContext, useEffect, useState } from "react";
import {
  MdLocalDining,
  MdSearch,
  MdStar,
  MdTimeline,
  MdTimer,
  MdTimeToLeave,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../Store/dataSlice";
import { LocationContext } from "../context/LocationContext";
import { CLOUDINARY_IMG_URL, IMG_SLUG_URL } from "../../utils/Constants";
import { Navigate, useNavigate } from "react-router-dom";
import TopRestaurantFoodCard from "../TopRestraunt/TopRestaurantFoodCard";

const Search = () => {
  const navigate = useNavigate();

  const { lat, lng } = useContext(LocationContext);
  const [foodItemNav, setfoodItemNav] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(10);
  const [showResData, setShowResData] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);

  const data = useSelector((store) => store.app.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllData({ lat: lat || "28.7040592", lng: lng || "77.10249019999999" })
    );
  }, [lat, lng, dispatch]);

  useEffect(() => {
    if (data === "Location Unserviceable") {
      navigate("/404");
    }

    setfoodItemNav(
      data?.data?.cards?.[0]?.card?.card?.imageGridCards?.info || []
    );
  }, [data]);

  const changeHandler = (val) => {
    setInpVal(val);
  };

  const fetchSearchResult = async () => {
    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${
        lat || "28.7040592"
      }&lng=${lng || "77.10249019999999"}&str=${inpVal}`
    );

    const data = await res.json();
    setSearchResult(data?.data?.suggestions || []);
    setShowSearchData(true);
  };

  useEffect(() => {
    fetchSearchResult();
  }, [inpVal]);

  const fetchRestaurants = async () => {
    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${
        lat || "28.7040592"
      }&lng=${
        lng || "77.10249019999999"
      }&str=${inpVal}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );

    const data = await res.json();

    const resData =
      data.data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards;
    // Displayed items based on the current count
    // const displayedData = resData.slice(0, displayedCount);
    // console.log(displayedData);
    setRestaurantData(resData);
    console.log(resData);
  };

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 10);
  };

  const clickHandler = () => {
    setShowSearchData(false);
    fetchRestaurants();
  };

  // const restaurantClickHandler = async (resId) => {
  //   // const res = await fetch(
  //   //   `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${resId}&catalog_qa=undefined&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22btrmbvwdfin5wp4dw1v7%22%2C%22dishFamilyId%22%3A%22846516%22%2C%22dishFamilyIds%22%3A%5B%22846516%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D&submitAction=SUGGESTION`
  //   // );
  //   // const data = await res.json();
  //   // console.log(data);
  //   // const resLink = `https://www.swiggy.com/city/noida-1/the-tandoori-tales-sector-72-rest260479`
  //   // // navigate("/restaurant-menu/:slug");
  // };

  return (
    <div className="w-full md:relative block px-5 my-10">
      <div className="md:w-[800px] mx-auto my-5">
        {/* Input Box */}
        <div className="relative">
          <input
            className="w-full shadow border focus:border-[#f35200] border-gray-300 rounded-sm focus:outline-none placeholder:text-gray-500 placeholder:font-semibold px-4 py-3"
            placeholder="Search for restaurants and foods"
            type="text"
            value={inpVal}
            onChange={(e) => changeHandler(e.target.value)}
          />

          <div className="absolute top-3 right-3">
            <MdSearch
              size={"1.8rem"}
              className="text-gray-500 hover:text-[#f35200] cursor-pointer"
            />
          </div>
        </div>

        {/* Popular Cuisines */}
        <div className="w-full">
          <h1 className="text-gray-700 font-extrabold text-2xl mt-10">
            Popular Cuisines
          </h1>

          <div
            className={`flex md:-ml-10 gap-6 overflow-x-scroll md:px-10 scrolling transition-all duration-700`}
          >
            {foodItemNav.length > 0 ? (
              foodItemNav.map((item) => (
                <img
                  key={item.id}
                  src={`${IMG_SLUG_URL}${item.imageId}`}
                  alt="food-img"
                  className={`w-[6rem] cursor-pointer transition-all duration-700`}
                  // style={{ transform: `translateX(-${translateValue}rem)` }}
                />
              ))
            ) : (
              <p className="text-center w-full">Loading...</p> // Display this if foodItemNav is empty
            )}
          </div>
        </div>

        {/* Search Result */}

        {searchResult.length > 0 && showSearchData ? (
          <div className="w-full mt-8">
            {searchResult.length > 0 && (
              <h1 className="text-gray-700 font-extrabold text-2xl">
                Search Results
              </h1>
            )}
            {searchResult.map((item, index) => {
              const { text, tagToDisplay, cloudinaryId } = item;

              return (
                <div
                  key={index}
                  className="flex gap-6 items-center my-5 hover:bg-gray-200 hover:rounded-md hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => clickHandler()}
                >
                  <div className="">
                    <img
                      src={`${CLOUDINARY_IMG_URL}${cloudinaryId}`}
                      alt="food-img"
                      className="w-[5rem] h-[80px] object-cover rounded-md bg-slate-200 border"
                    />
                  </div>
                  <div className="text-gray-700 ">
                    <h1 className="font-bold">{text}</h1>
                    <p className="font-semibold text-sm flex gap-1 tracking-wide">
                      {tagToDisplay}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Restaurant Data */}
        {restaurantData.length > 0 && (
          <div className="w-full mt-10">
            <h1 className="text-gray-700 font-extrabold text-2xl">
              Restaurants
            </h1>

            {/* Restaurant cards */}
            <div className="w-full bg-[#f5f6f8] grid md:grid-cols-2 grid-cols-1">
              {restaurantData.map((item) => {
                const {
                  id,
                  name,
                  cloudinaryImageId,
                  avgRating,
                  costForTwoMessage,
                  promoted,
                  sla,
                } = item.card.card.info;
                return (
                  <div key={id} className="">
                    <div className="w-[90%] mx-auto my-6 p-4 h-[130px] bg-white flex gap-4 items-center rounded transition-all duration-200 hover:shadow-lg">
                      <div className="relative">
                        <img
                          className="min-w-[5rem] aspect-square h-[80px] object-cover rounded-md bg-slate-200 border"
                          src={CLOUDINARY_IMG_URL + cloudinaryImageId}
                          alt={name}
                        />
                        {promoted && (
                          <div className="absolute px-1 py-[2px] top-0 -left-1 bg-gray-700 text-white">
                            <h3 className="text-xs">Ad</h3>
                          </div>
                        )}
                        <div className="absolute -bottom-4 left-[8px]">
                          <button className="text-sm bg-[#f35200] text-gray-200 px-4 py-[2px] font-semibold tracking-wide rounded-sm">
                            ADD
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-gray-700 line-clamp-1">
                          {name}
                        </h1>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                          <div className="flex items-center gap-1">
                            <MdStar size={"1.1rem"} />
                            <span>{avgRating || 4.1}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <MdLocalDining size={"1.1rem"} />
                            <span className="">{costForTwoMessage}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
                          <MdTimer size={"1.1rem"} />
                          <span className="">
                            {sla.minDeliveryTime} - {sla.maxDeliveryTime} mins
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
