import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Make sure to import Link if it's used
import { CLOUDINARY_IMG_URL } from "../../utils/Constants";

const Footer = () => {
  const data = useSelector((store) => store.app.data);

  const [footerDetails, setFooterDetails] = useState(null);

  useEffect(() => {
    if (data && data.data?.cards?.[9]?.card?.card) {
      setFooterDetails(data.data.cards[9].card.card);
    }
  }, [data]);

  return (
    footerDetails && (
      <div className="md:w-10/12 w-full mx-auto flex lg:flex-row flex-col items-center justify-between py-8 gap-6">
        <h1 className="font-bold lg:text-3xl text-xl text-center lg:text-left">
          {footerDetails.title}
        </h1>
        <div className="flex gap-6">
          {footerDetails.androidAppLink && footerDetails.androidAppImage && (
            <Link to={footerDetails.androidAppLink}>
              <img
                src={CLOUDINARY_IMG_URL + footerDetails.androidAppImage}
                alt="Android App Link"
                className="w-40"
              />
            </Link>
          )}
          {footerDetails.iosAppLink && footerDetails.iosAppImage && (
            <Link to={footerDetails.iosAppLink}>
              <img
                src={CLOUDINARY_IMG_URL + footerDetails.iosAppImage}
                alt="iOS App Link"
                className="w-40"
              />
            </Link>
          )}
        </div>
      </div>
    )
  );
};

export default Footer;
