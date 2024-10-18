import { MdExpandMore, MdOutlineShoppingCart } from "react-icons/md";
import { PiBagSimpleBold } from "react-icons/pi";
import { CgSearch } from "react-icons/cg";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full shadow-md">
      <div className="w-10/12 p-4 mx-auto flex">
        {/* Logo & Other Div */}
        <div className="w-2/12 flex gap-10 items-center">
          <Link to={"/"} className="w-8">
            <img src="/logo.svg" className="" alt="logo" />
          </Link>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-sm border-b-2 border-gray-600 hover:border-[#fe5200] pb-1 hover:text-[#fe5200] cursor-pointer text-gray-600">
              Other{" "}
            </p>
            <MdExpandMore size={"1.55rem"} color="#fe5200" />
          </div>
        </div>

        {/* Links Div */}
        <div className="w-full flex justify-end items-center">
          <ul className="flex gap-14 bg-re-200 font-semibold text-gray-600">
            {/* List Items */}
            <li className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer">
              <PiBagSimpleBold size={"1.35rem"} />
              Swiggy Corporate
            </li>
            <li className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer">
              <CgSearch size={"1.35rem"} />
              Search
            </li>
            <li className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer">
              <RiDiscountPercentLine size={"1.35rem"} />
              Offers
            </li>
            <li className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer">
              <IoHelpBuoyOutline size={"1.35rem"} />
              Help
            </li>
            <li className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer">
              <FaRegUser size={"1.25rem"} />
              Sign In
            </li>
            <li className="flex gap-2 items-center hover:text-[#fe5200] cursor-pointer">
              <MdOutlineShoppingCart size={"1.35rem"} />
              Cart
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
