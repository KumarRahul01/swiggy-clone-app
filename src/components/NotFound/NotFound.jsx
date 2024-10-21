import { useNavigate } from "react-router-dom";
import { UNSERVICABLE_IMG_URL } from "../../utils/Constants";

const NotFound = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    console.log("Hello world");

    navigate("/");
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <img
          className="max-w-lg object-cover"
          src={UNSERVICABLE_IMG_URL}
          alt="Location Unavailable"
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-center font-bold text-gray-800">
            Location Unserviceable
          </h1>
          {/* <h3 className="text-lg text-center font-bold text-gray-700 mt-5">
            Please Search Another Location ...
          </h3> */}
          <button
            className="px-6 py-1 bg-[#fe5200] rounded-lg text-white text-lg font-bold cursor-pointer my-6"
            onClick={clickHandler}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
