import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import LocationProvider from "./components/context/LocationContext";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./cart/Cart";

const App = () => {
  return (
    <>
      <div>
        <LocationProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant-menu/:slug" element={<RestaurantMenu />} />
            <Route path="/location-unservicable" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </LocationProvider>
      </div>
    </>
  );
};

export default App;
