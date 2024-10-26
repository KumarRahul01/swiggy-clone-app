import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopRestaurantFoodCard from "../TopRestraunt/TopRestaurantFoodCard";

const RestaurantOnline = () => {
  const data = useSelector((store) => store.app.data);

  const [title, setTitle] = useState("");
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    // if (data) {
    //   setTitle(data?.data?.cards[2]?.card?.card?.title);
    //   setRestaurant(
    //     data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
    //       ?.restaurants
    //   );
    // }
    if (data) {
      // setTitle(data?.data?.cards[1]?.card?.card?.header?.title);
      setTitle(data?.data?.cards[2]?.card?.card?.title);
      setRestaurant(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    }
  }, [data]);

  return (
    <>
      <div className="md:ml-8 mb-4">
        <div className="my-8">
          <h1 className="text-2xl font-extrabold">{title}</h1>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-4 mt-10 mb-16 pb-20">
          {restaurant &&
            restaurant.map((restaurant) => {
              const resdata = restaurant.info;
              const reslink = restaurant?.cta?.link;

              return (
                <div
                  key={resdata.id}
                  className="min-w-[268px] h-fit rounded-lg text-gray-900 cursor-pointer hover:scale-90 transition-all duration-300"
                >
                  <TopRestaurantFoodCard resdata={resdata} reslink={reslink} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default RestaurantOnline;
