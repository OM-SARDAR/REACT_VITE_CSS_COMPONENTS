import React from "react";
import "./Banner.css";
import AuctionXJapanese from "./FIles/images/AuctionXJapanese.jpg";
import AuctionXMessi from "./FIles/images/AuctionXMessi.jpg";
import AuctionXVirat from "./FIles/images/AuctionXVirat.jpg";
import AuctionXRonaldo from "./FIles/images/AuctionXRonaldo.jpg";
import AuctionXRock from "./FIles/images/AuctionXRock.jpg";

const images = [
  "https://images.bewakoof.com/uploads/grid/app/Mad-Diwali-Sale-IK-RM-1x1-HC-Banner-deals-are-live--1--1730374454.gif",
  AuctionXJapanese,
  AuctionXMessi,
  AuctionXVirat,
  AuctionXRonaldo,
  AuctionXRock,
];

const SavingsZoneBanner = () => {
  return (
    <div className="savingzone-carousel-container">
      <div className="savingzone-carousel">
        {images.concat(images).map((src, index) => (
          <div key={index} className="savingzone-carousel-item">
            <img
              src={src}
              alt={`Promo ${index}`}
              className="savingzone-promo-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsZoneBanner;
