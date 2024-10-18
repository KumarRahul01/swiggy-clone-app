import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { CLOUDINARY_IMG_URL, IMG_SLUG_URL } from "../../utils/Constants";

const FoodMenuCard = ({ menuItem, index }) => {
  // console.log(index);

  const { itemCards, title } = menuItem.card?.card;
  console.log(menuItem.card?.card?.itemCards);

  //* Rendering Menu Items for Itemcards

  let setState = false;

  if (itemCards) {
    setState = true;
  }

  const [showItems, setShowItems] = useState(setState);

  const toggleDropDown = () => {
    setShowItems(!showItems);
  };

  const [showDescription, setShowDescription] = useState(null);

  const showDesc = (i) => {
    setShowDescription(showDescription === i ? null : i);
  };
  // const { title, itemCards } = menuItem.card.card;
  return (
    <>
      {itemCards && (
        <>
          <div
            key={index}
            className="flex flex-col text-sm font-medium text-gray-700 w-full"
          >
            <div className="w-full flex items-center justify-between mt-8 mb-2">
              <h1 className="font-extrabold text-xl text-black">
                {title} ({itemCards.length})
              </h1>
              <div className="cursor-pointer" onClick={() => toggleDropDown()}>
                {showItems ? (
                  <IoChevronUp size={"1.35rem"} />
                ) : (
                  <IoChevronDown size={"1.35rem"} />
                )}
              </div>
            </div>
            {showItems &&
              itemCards.map((item, itemIndex) => {
                const allItems = item.card.info;

                const { name, description, price, defaultPrice, imageId } =
                  allItems;

                const itemCategory = allItems?.itemAttribute?.vegClassifier;
                const rating = allItems?.ratings?.aggregatedRating?.rating;
                const ratingCount =
                  allItems?.ratings?.aggregatedRating?.ratingCountV2;

                return (
                  <div
                    className="w-full m-1 flex gap-4 items-center justify-between"
                    key={itemIndex}
                  >
                    <div className="flex flex-col w-9/12">
                      {/* <div>{itemCategory === "VEG" ? (img)}</div> */}
                      {itemCategory === "VEG" ? (
                        <img
                          className="w-4"
                          src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
                          alt="veg"
                        />
                      ) : (
                        <img
                          className="w-4"
                          src="https://rukminim2.flixcart.com/image/850/1000/kr0ynbk0/noodle/i/y/m/140-2x-spicy-hot-chicken-flavour-instant-korean-noodles-140gm-original-imag4wnxhwn3gtzz.jpeg?q=90&crop=false"
                          alt="non-veg"
                        />
                      )}
                      <h2 className="text-lg font-extrabold text-black">
                        {name}
                      </h2>
                      <p className="font-semibold text-[16px] text-black my-1">
                        ₹ {price / 100 || defaultPrice / 100}
                      </p>
                      <div className="flex gap-1">
                        <IoStar size={"1.15rem"} className="text-green-800" />{" "}
                        <span className="font-extrabold text-[14px] text-green-800">
                          {rating || 4}
                        </span>{" "}
                        <div className="text-[14px] text-gray-500">
                          ({ratingCount || 34})
                        </div>{" "}
                      </div>
                      <p className="text-gray-500">
                        Item
                        {description.length > 150
                          ? description.slice(0, 150) + "..."
                          : description}
                        <button
                          className="font-extrabold"
                          onClick={() => showDesc(itemIndex)}
                        >
                          {showDescription === itemIndex ? "" : "more"}
                        </button>
                      </p>
                    </div>
                    <div className="w-3/12 p-4">
                      <div className="w-full relative">
                        <img
                          src={IMG_SLUG_URL + imageId}
                          className="w-full object-cover rounded-lg"
                          alt={name + "-image"}
                        />
                        <button className="absolute bottom-6 border left-8 bg-slate-50 px-8 py-1 text-green-700 font-extrabold text-xl rounded-lg">
                          Add
                        </button>
                        <p className="my-2 py-2 text-center text-gray-400 text-xs">
                          Customizable
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <hr className="h-3 bg-gray-200" />
        </>
      )}
    </>
  );
};

export default FoodMenuCard;
