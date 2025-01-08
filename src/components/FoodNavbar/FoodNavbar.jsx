import { useState, useEffect, useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../Store/dataSlice";
import { IMG_SLUG_URL } from "../../utils/Constants";
import { LocationContext } from "../context/LocationContext";
import { useNavigate } from "react-router-dom";

const FoodNavbar = () => {
  const navigate = useNavigate();
  const { lat, lng } = useContext(LocationContext);

  const [foodItemNav, setfoodItemNav] = useState([]);
  const [title, setTitle] = useState("");
  const [translateValue, setTranslateValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const data = useSelector((store) => store.app.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllData({ lat: lat || "28.7040592", lng: lng || "77.10249019999999" })
    );
  }, [lat, lng, dispatch]);

  useEffect(() => {
    if (data?.data?.cards?.[0]?.card?.card?.imageGridCards?.info) {
      setLoading(true);
    }
  }, [data]);

  useEffect(() => {
    if (data === "Location Unserviceable") {
      navigate("/404");
    }
    setTitle(data?.data?.cards?.[0]?.card?.card?.header?.title || ""); // Default to empty string if undefined

    setfoodItemNav(
      data?.data?.cards?.[0]?.card?.card?.imageGridCards?.info || []
    );
  }, [data]);

  const handlePrev = () => {
    if (translateValue <= 0) {
      setTranslateValue(0);
    } else {
      setTranslateValue((prev) => prev - 30);
    }
  };

  const handleNext = () => {
    if (translateValue >= 180) {
      setTranslateValue(180); // Adjust based on item width and gap
    } else {
      setTranslateValue((prev) => prev + 30);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-between mt-4">
            <h1 className="md:ml-8 font-extrabold text-2xl py-4">{title}</h1>

            <div className="flex gap-4">
              <FaArrowLeft
                size={"1.65rem"}
                className={`${
                  translateValue === 0
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-200"
                } rounded-full p-1 cursor-pointer`}
                onClick={handlePrev}
              />
              <FaArrowRight
                size={"1.65rem"}
                className={`${
                  translateValue >= 150
                    ? "bg-gray-200 text-gray-400"
                    : "bg-gray-200"
                } rounded-full p-1 cursor-pointer`}
                onClick={handleNext}
              />
            </div>
          </div>

          <div
            className={`flex gap-6 overflow-x-scroll md:px-10 scrolling transition-all duration-700`}
          >
            {foodItemNav.length > 0 ? (
              foodItemNav.map((item) => (
                <img
                  key={item.id}
                  src={`${IMG_SLUG_URL}${item.imageId}`}
                  alt="food-img"
                  className={`w-[9rem] transition-all duration-700`}
                  style={{ transform: `translateX(-${translateValue}rem)` }}
                />
              ))
            ) : (
              <p className="text-center w-full">Loading...</p> // Display this if foodItemNav is empty
            )}
          </div>
          <hr className="border-[2px] md:ml-8" />
        </>
      ) : (
        <div className="md:ml-8 font-semibold text-2xl py-4 bg-[#0F162B] h-64 flex items-center justify-center transition-all duration-150 delay-300 mt-4">
          <div
            role="status"
            className="flex flex-col items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 animate-spin fill-[#6a6a6a]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="text-gray-200 text-lg my-4">
              Loading great deals for you...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodNavbar;
