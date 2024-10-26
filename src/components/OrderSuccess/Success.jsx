import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:my-60 flex flex-col items-center justify-center">
      <h1 className="font-bold text-5xl mb-6">Order Successfull!</h1>
      <p className="text-xl">Your order has been placed successfully 😊😊 </p>
      <button
        className="my-6 px-4 py-1 bg-[#f35200] hover:bg-[#ff6a1a] text-slate-100 text-lg rounded-md font-semibold"
        onClick={() => navigate("/")}
      >
        Explore Foods
      </button>
    </div>
  );
};

export default Success;
