import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import LocationProvider from "./components/context/LocationContext";
import NotFound from "./components/NotFound/NotFound";
import Cart from "./components/cart/Cart";
import Success from "./components/OrderSuccess/Success";
import Search from "./components/Search/Search";
import SignIn from "./components/SignIn/SignIn";

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
            <Route path="/success" element={<Success />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </LocationProvider>
      </div>
    </>
  );
};

export default App;
