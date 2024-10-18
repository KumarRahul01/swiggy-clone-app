import { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

const Menu = ({ menuData }) => {
  // console.log(menuData);

  return (
    <>
      <div className="tracking-widest text-[16px] font-semibold">MENU</div>

      {/* Search Div */}
      <div className="relative flex items-center justify-center bg-gray-100 border border-gray-100 py-3 rounded-xl my-5 cursor-pointer">
        <h1 className="text-[16px] font-semibold text-gray-600">
          Search for dishes
        </h1>
        <span className="absolute right-4">
          <IoIosSearch size={"1.25rem"} />
        </span>
      </div>

      {/* Restaurant Menu */}
      {menuData.map((menuItem, index) => {
        const { title, itemCards } = menuItem.card.card;
        // console.log("Item Crda", itemCards);
        // SS : 7:40:00
        return (
          <div
            key={index}
            className="flex items-center gap-4 text-sm font-medium text-gray-700"
          >
            <div>
              {title} ({itemCards.length})
              {itemCards.map((item, i) => {
                const allItems = item.card.info;
                return (
                  <div className="my-5" key={i}>
                    <div className="">{allItems.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Menu;
