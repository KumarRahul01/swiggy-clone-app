import React from "react";
import FoodNavbar from "../FoodNavbar/FoodNavbar";
import TopRestraunt from "../TopRestraunt/TopRestraunt";
import RestaurantOnline from "../RestaurantOnlineDelivery/RestaurantOnline";
import Navbar from "../Navbar/Navbar";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const cartItems = useSelector((store) => store.cart.cartData);
  const navigate = useNavigate();
  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      {/* Your App Components Go Here */}
      <div className="md:w-10/12 w-full mx-auto md:px-10 px-5 relative">
        <FoodNavbar />
        <TopRestraunt />
        <RestaurantOnline />

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
  );
};

export default Home;
