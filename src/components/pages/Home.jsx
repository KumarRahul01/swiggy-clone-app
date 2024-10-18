import React from "react";
import FoodNavbar from "../FoodNavbar/FoodNavbar";
import TopRestraunt from "../TopRestraunt/TopRestraunt";
import RestaurantOnline from "../RestaurantOnlineDelivery/RestaurantOnline";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* Your App Components Go Here */}
      <div className="w-10/12 mx-auto px-10">
        <FoodNavbar />
        <TopRestraunt />
        <RestaurantOnline />
      </div>
    </>
  );
};

export default Home;
