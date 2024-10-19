import React from "react";
import FoodNavbar from "../FoodNavbar/FoodNavbar";
import TopRestraunt from "../TopRestraunt/TopRestraunt";
import RestaurantOnline from "../RestaurantOnlineDelivery/RestaurantOnline";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
      {/* Your App Components Go Here */}
      <div className="w-10/12 mx-auto px-10 ">
        <FoodNavbar />
        <TopRestraunt />
        <RestaurantOnline />
      </div>
    </>
  );
};

export default Home;
