import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoChevronUp } from "react-icons/io5";

import { IoChevronDown } from "react-icons/io5";
import { CLOUDINARY_IMG_URL, IMG_SLUG_URL } from "../../utils/Constants";
import ItemCardMenu from "./ItemCardMenu";

const Menu = ({ topMenuData }) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (topMenuData.length > 0) {
      setMenuData(
        topMenuData.filter(
          (data) => data.card.card.itemCards || data.card.card.categories
        )
      );
    }
  }, [topMenuData]);
  // console.log(menuData);

  return (
    <>
      {menuData.map((data, index) => {
        const { title, itemCards, categories } = data.card.card;

        return (
          <div key={index}>
            <div className="flex items-center justify-between my-6">
              <h1 className="text-xl font-extrabold">
                {title} ({itemCards ? itemCards.length : categories.length})
              </h1>
            </div>
            {itemCards
              ? itemCards.map((data, itemIndex) => {
                  // return <div key={itemIndex}>{data.card.info.name}</div>;
                  return (
                    <div
                      key={itemIndex}
                      className=" relative flex gap-10 mt-10 pb-5"
                    >
                      <ItemCardMenu data={data} />
                      <div className="absolute bottom-0 h-[2px] w-full bg-slate-200"></div>
                    </div>
                  );
                })
              : categories.map((data, categoryIndex) => {
                  const cartItemCardsData = data.itemCards;

                  return (
                    <div key={categoryIndex}>
                      {cartItemCardsData.map((data, catItemIndex) => {
                        return (
                          <div
                            key={catItemIndex}
                            className=" relative flex gap-10 mt-10 pb-5"
                          >
                            <ItemCardMenu data={data} />
                            <div className="absolute bottom-0 h-[2px] w-full bg-slate-200"></div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
          </div>
        );
      })}
    </>
  );
};

export default Menu;
