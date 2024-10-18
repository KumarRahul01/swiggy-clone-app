import React, { useEffect, useState } from "react";
import { OFFERS_IMG_URL } from "../../utils/Constants";

const Discounts = ({ data, translateValue }) => {
  const { header, offerTag, offerLogo, couponCode } = data.info;

  return (
    <div
      className="min-w-[328px] h-[76px] border rounded-2xl flex items-center gap-5 transition-all duration-300"
      style={{ translate: `-${translateValue}rem` }}
    >
      <div className="flex items-center gap-4 px-4">
        <img
          className="w-12 h-12"
          src={OFFERS_IMG_URL + offerLogo}
          alt="offer logo"
        />
        <div>
          <h2 className="font-extrabold text-lg capitalize">{header}</h2>
          <span className="line-clamp-1">
            {offerTag ? offerTag : couponCode || "USE TRYNEW"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
