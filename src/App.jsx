import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import LocationProvider from "./components/context/LocationContext";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <>
      <div>
        <LocationProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant-menu/:slug" element={<RestaurantMenu />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LocationProvider>
      </div>
    </>
  );
};

export default App;
