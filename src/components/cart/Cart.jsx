import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_SLUG_URL } from "../../utils/Constants";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeItem,
} from "../Store/CartSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { persistor } from "../Store/SwiggyStore";
import toast from "react-hot-toast";
import Footer from "../Footer/Footer";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.cartData);

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const increaseHandler = (id) => {
    dispatch(increaseQty({ id }));
  };

  const decreaseHandler = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem.quantity === 1) {
      // remove item from cart
      dispatch(removeItem({ id }));
      return;
    }
    dispatch(decreaseQty({ id }));
  };

  const deleteItem = (id) => {
    dispatch(removeItem({ id }));
  };

  useEffect(() => {
    let price = 0;
    cartItems.map((item) => {
      price += item.price * item.quantity;
    });
    setTotalPrice(Math.round(price / 100));
  }, [cartItems, increaseHandler, decreaseHandler]);

  const handleOrder = () => {
    // clear the cart items
    setLoading(true);
    setTimeout(() => {
      toast.success("Order placed successfully");
      dispatch(clearCart());
      navigate("/success");
      setLoading(false);
    }, 1000);

    // clearing the persisted cart data in localStorage
    // persistor.purge();
    localStorage.clear();
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center my-60">
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#f35200]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="p-5 md:p-0">
          {cartItems.length > 0 ? (
            <div className="md:w-[800px] mx-auto md:my-4">
              {cartItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="overflow-hidden sm:flex items-center justify-between w-full md:gap-10 gap-6 mb-2 border-b-2"
                  >
                    <div className="w-full text-gray-700 p-5 md:p-0">
                      <h1 className="text-lg font-bold text-gray-700">
                        {item.name}
                      </h1>
                      <h3 className="font-semibold text-gray-700 flex gap-1 my-2 tracking-wide">
                        ₹{" "}
                        {item.finalPrice && (
                          <span className="line-through">
                            {Math.round(item.price / 100) ||
                              Math.round(item.defaultPrice / 100)}
                          </span>
                        )}
                        <span>
                          {item.finalPrice
                            ? Math.round(item.finalPrice / 100)
                            : Math.round(item.price / 100) ||
                              Math.round(item.defaultPrice / 100)}
                        </span>
                      </h3>
                      <h3 className="font-semibold md:font-bold text-lg">
                        Quantity:
                        <div className="flex md:gap-4 gap-3 items-center my-2">
                          <button
                            className="bg-[#f35200] px-2 text-xl text-gray-100"
                            onClick={() => decreaseHandler(item.id)}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className="bg-[#f35200] px-2 text-xl text-gray-100"
                            onClick={() => increaseHandler(item.id)}
                          >
                            +
                          </button>
                          {/* total */}
                          <h3 className="font-semibold">
                            Total: ₹{" "}
                            {Math.round((item.quantity * item.price) / 100) ||
                              Math.round(item.defaultPrice / 100) ||
                              Math.round(item.finalPrice / 100)}
                          </h3>
                          {/* remove */}
                          <MdDelete
                            size={"1.5rem"}
                            className="text-[#f35200] cursor-pointer"
                            onClick={() => deleteItem(item.id)}
                          />
                        </div>
                      </h3>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-wrap justify-center items-center">
                      <div className="w-full p-3">
                        <img
                          className="h-40 aspect-[3/2] w-full object-cover rounded-xl border"
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
              <div className="flex gap-10 md:w-[800px] w-full mx-auto my-6">
                <div className="flex flex-col gap-6 justify-between items-center w-full">
                  <h2 className="font-bold text-xl text-[#f35200]">
                    Total Price:{" "}
                    <span className="text-gray-900">₹ {totalPrice || 0}</span>
                  </h2>
                  {/* checkout */}
                  <button
                    className="px-4 py-1 bg-[#f35200] hover:bg-[#ff6a1a] text-slate-100 font-bold rounded-md"
                    onClick={() => handleOrder()}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[800px] mx-auto text-center my-40 flex flex-col items-center justify-center">
              <h1 className="lg:text-3xl font-semibold">
                Please add something to your cart!
              </h1>
              <button
                className="my-8 px-4 py-1 bg-[#f35200] hover:bg-[#ff6a1a] text-slate-100 text-lg rounded-md font-semibold"
                onClick={() => navigate("/")}
              >
                Explore Foods
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
