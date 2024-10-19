import { useNavigate } from "react-router-dom";
import { UNSERVICABLE_IMG_URL } from "../../utils/Constants";

const NotFound = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
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
          <h1 className="text-3xl text-center font-bold text-gray-700">
            Location Unserviceable
          </h1>
          <button
            className="mt-5 text-sm font-bold text-white bg-[#fe5200] hover:bg-[#fe5000d1] transition-all duration-300 px-8 py-2 rounded-md"
            type="button"
            onClick={() => {
              clickHandler();
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
