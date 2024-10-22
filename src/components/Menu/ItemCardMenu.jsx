import React, { useEffect, useState } from "react";
import { IMG_SLUG_URL } from "../../utils/Constants";
import { IoStar } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/CartSlice.jsx";

const ItemCardMenu = ({ data }) => {
  // console.log(data);

  const { name, imageId, finalPrice, defaultPrice, price, description, id } =
    data.card.info;

  const { rating, ratingCountV2 } = data.card.info.ratings.aggregatedRating;

  const { vegClassifier } = data?.card?.info?.itemAttribute;

  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (description && description.length > 120) {
      const newDesc = description.substring(0, 120) + "... ";
      setDesc(newDesc);
    } else if (description) {
      setDesc(description);
    }
  }, []);

  const showDesc = () => {
    setDesc(description);
  };

  const dispatch = useDispatch();

  const addItemToCart = (
    id,
    name,
    imageId,
    finalPrice,
    defaultPrice,
    price
  ) => {
    dispatch(
      addItem({
        id,
        name,
        imageId,
        price: finalPrice || defaultPrice || price,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <div className="w-9/12 text-gray-700">
        <p>
          {vegClassifier === "VEG" || vegClassifier === "" ? (
            <img className="w-4" src="/veg.jpg" />
          ) : (
            <img className="w-4" src="/non-veg.jpg" />
          )}
        </p>
        <h1 className="text-lg font-bold text-gray-700">
          {data.card.info.name}
        </h1>
        <h3 className="font-semibold text-black flex gap-1 mb-2 tracking-wide">
          ₹{" "}
          {finalPrice && (
            <span className="line-through">
              {price / 100 || defaultPrice / 100}
            </span>
          )}
          <span>
            {finalPrice ? finalPrice / 100 : price / 100 || defaultPrice / 100}
          </span>
        </h3>
        <div className="flex gap-1 items-center font-medium mb-2">
          <IoStar className="text-green-800" size={"0.9rem"} />
          <h3
            className={`font-bold 
              ${rating <= 3.5 && "text-yellow-500"}
              ${rating > 3.5 && "text-green-800"}
             `}
          >
            {rating || (
              <span
                className={`${rating <= 3.5 && "text-yellow-500"}
              ${rating > 3.5 && "text-green-800"}`}
              >
                4.1
              </span>
            )}
          </h3>
          <h3>({ratingCountV2 || 48})</h3>
        </div>
        <div>
          <p className="font-medium">
            {desc || "No description is required for this tasty meal! "}
            <button onClick={showDesc} className=" font-bold">
              {desc === description || desc == "" ? "" : "more "}
            </button>
          </p>
        </div>
      </div>
      <div className="w-3/12">
        <div className="w-full p-3 relative">
          <img
            className="h-40 aspect-[3/2] object-cover rounded-xl"
            src={imageId ? IMG_SLUG_URL + imageId : "/tempImg.webp"}
            alt={name}
          />
          <button
            className="absolute bottom-1 left-[15%] bg-gray-50 hover:bg-gray-200 transition-all duration-300 px-12 py-1 text-green-600 font-extrabold text-lg rounded-lg border"
            onClick={() =>
              addItemToCart(id, name, imageId, finalPrice, defaultPrice, price)
            }
          >
            ADD
          </button>
        </div>
        <p className="text-center text-[13px] text-gray-500 font-medium">
          Customisable
        </p>
      </div>
    </>
  );
};

export default ItemCardMenu;