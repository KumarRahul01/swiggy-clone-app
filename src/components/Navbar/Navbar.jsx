import { MdOutlineShoppingCart } from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import { CgSearch } from "react-icons/cg";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/LocationContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { getLatAndLng } = useContext(LocationContext);

  const [searchResult, setSearchResult] = useState([]);
  const [searchLocation, setSearchLocation] = useState("Noida");
  const [clearText, setClearText] = useState(false);

  //* Navbar Data
  const navData = [
    {
      name: "Swiggy Corporate",
      to: "#",
      icon: "PiBagSimpleBold",
    },
    {
      name: "Search",
      to: "#",
      icon: "CgSearch",
    },
    {
      name: "Offers",
      to: "#",
      icon: "RiDiscountPercentLine",
    },
    {
      name: "Help",
      to: "#",
      icon: "IoHelpBuoyOutline",
    },
    {
      name: "Sign In",
      to: "#",
      icon: "FaRegUser",
    },
  ];

  //* Calling AutoComple Search API

  const handleChange = async (e) => {
    const val = e.target.value;
    setSearchLocation(val);

    // If the input is empty, clear the search results and return early
    if (val === "") {
      setClearText(false);
      setSearchResult([]);
      return;
    }

    setClearText(true);

    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`
      );
      const data = await res.json();
      setSearchResult(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchLatAndLng = async (id) => {
    if (id === "") return;
    // console.log(id);
    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
      );
      const data = await res.json();
      const { lat, lng } = data.data[0].geometry.location;
      // console.log("Your Lat & lng coordinates", lat, lng);
      getLatAndLng(lat, lng);
    } catch (error) {
      console.log(error);
    }
  };

  //* Setting the values inside the input field
  const setSearchValue = (name, id) => {
    setSearchLocation(name);
    setClearText(true);
    fetchLatAndLng(id);
    setSearchResult("");
  };

  //* Clearing All Entries
  const clearData = () => {
    setSearchLocation("");
    setSearchResult([]);
    setClearText(true);
    setClearText(false);
  };

  //* Fetching Cart Length
  const cartItems = useSelector((store) => store.cart.cartData);

  return (
    <>
      <div className="w-full shadow-md relative">
        <div className="w-9/12 py-4 mx-auto flex h-fit">
          {/* Logo & Other Div */}
          <div className="w-3/12 flex gap-6 items-center">
            <Link to={"/"} className="w-8">
              <img src="/logo.svg" className="" alt="logo" />
            </Link>
            <div className="flex items-center overflow-hidden ">
              <input
                className="font-bold text-sm border-b-2 border-gray-600 hover:border-[#fe5200] text-[#fe5200] focus:outline-none p-1  cursor-pointer w-56"
                type="text"
                placeholder="Noida"
                value={searchLocation}
                onChange={(e) => handleChange(e)}
              />
              {clearText && (
                <div className="text-gray-600 hover:text-[#fe5200]">
                  <RxCross2
                    className="cursor-pointer"
                    size={"1.55rem"}
                    onClick={() => clearData()}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Links Div */}
          <div className="w-full flex justify-end items-center">
            <ul className="flex gap-14 bg-re-200 font-semibold text-gray-600">
              {/* List Items */}
              {navData.map((data, index) => {
                return (
                  <Link
                    to={navData.to}
                    key={index}
                    className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer"
                  >
                    {/* <data.icon size={"1.35rem"} /> */}
                    {data.name}
                  </Link>
                );
              })}
              <Link
                to={"/cart"}
                className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer relative"
              >
                <MdOutlineShoppingCart size={"1.35rem"} />
                Cart
                <div
                  className={`bottom-4 right-8 font-bold px-[6px] py-[2px] bg-[#fe5200] text-[12px] text-gray-100 rounded-full tracking-wide ${
                    cartItems.length === 0 ? "hidden" : "absolute"
                  }`}
                >
                  {cartItems.length}
                </div>
              </Link>
            </ul>
          </div>
        </div>

        {/* SearchResult Box */}
        <div className="absolute top-16 w-1/3 mx-20 h-fit z-20 bg-white">
          <div>
            {searchResult.length > 0 &&
              searchResult.map((data, index) => (
                <div
                  key={index}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() =>
                    setSearchValue(data.description, data.place_id)
                  }
                >
                  <span className="font-medium">
                    {data.structured_formatting.main_text}
                  </span>{" "}
                  <span className="text-sm opacity-45">
                    {data.structured_formatting.secondary_text}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
