import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant-menu/:slug" element={<RestaurantMenu />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
