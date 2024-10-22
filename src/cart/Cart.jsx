import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_SLUG_URL } from "../utils/Constants";
import { removeItem } from "../components/Store/CartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartData);
  console.log(cartItems);

  const dispatch = useDispatch();

  const decreaseHandler = (quant, id) => {
    if (quant > 1) {
      setQuantity(quant - 1);
    } else {
      // remove item from cart
      dispatch(removeItem);
    }
  };

  const increaseHandler = (quant) => {
    setQuantity(quant + 1);
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <div>
          <div className="h-[650px] w-full my-12">
            {cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex gap-10 w-[800px] mx-auto mb-2 border-b-2 items-center"
                >
                  <div className="w-8/12 text-gray-700">
                    <h1 className="text-lg font-bold text-gray-700">
                      {item.name}
                    </h1>
                    <h3 className="font-semibold text-black flex gap-1 mb-2 tracking-wide">
                      ₹{" "}
                      {item.finalPrice && (
                        <span className="line-through">
                          {item.price / 100 || item.defaultPrice / 100}
                        </span>
                      )}
                      <span>
                        {item.finalPrice
                          ? item.finalPrice / 100
                          : item.price / 100 || item.defaultPrice / 100}
                      </span>
                    </h3>
                    <h3 className="font-bold text-lg">
                      Quantity:
                      <div className="flex gap-4 items-center my-2">
                        <button
                          className="bg-[#f35200] px-2 text-xl text-gray-100"
                          onClick={() =>
                            decreaseHandler(item.quantity, item.id)
                          }
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="bg-[#f35200] px-2 text-xl text-gray-100"
                          onClick={() =>
                            increaseHandler(item.quantity, item.id)
                          }
                        >
                          +
                        </button>
                        {/* total */}
                        <h3 className="font-semibold">
                          Total: ₹{" "}
                          {(item.quantity * item.price) / 100 ||
                            item.defaultPrice / 100 ||
                            item.finalPrice / 100}
                        </h3>
                      </div>
                    </h3>
                  </div>
                  <div className="w-4/12">
                    <div className="w-full p-3">
                      <img
                        className="h-40 aspect-[3/2] object-cover rounded-xl"
                        src={
                          item.imageId
                            ? IMG_SLUG_URL + item.imageId
                            : "/tempImg.webp"
                        }
                        alt={item.name}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-[800px] mx-auto text-xl font-semibold text-center my-40">
          Please add something!
        </div>
      )}
    </div>
  );
};

export default Cart;
