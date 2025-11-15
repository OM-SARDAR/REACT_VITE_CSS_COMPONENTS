import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";
import { MdOutlineDescription } from "react-icons/md";
import { RiMapPinTimeFill } from "react-icons/ri";

import "./ProductDetailsPopUp.css";
import "./TimeCountdown.css";

// Local Demo Product List (Matches Product_List.js demo products)
const fallbackProducts = [
  {
    _id: "p1",
    name: "Apple iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip and titanium body.",
    biddingStartPrice: 125000,
    biddingStartDate: "2025-11-12T10:00:00Z",
    biddingStartTime: "2025-11-12T10:00:00Z",
    biddingEndTime: "2025-11-14T10:00:00Z",
    images: [
      {
        secure_url:
          "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
      },
    ],
  },
  {
    _id: "p2",
    name: "Sony WH-1000XM5 Headphones",
    description: "Noise-cancelling wireless over-ear headphones.",
    biddingStartPrice: 29000,
    biddingStartDate: "2025-11-12T12:00:00Z",
    biddingStartTime: "2025-11-12T12:00:00Z",
    biddingEndTime: "2025-11-13T12:00:00Z",
    images: [
      {
        secure_url:
          "https://m.media-amazon.com/images/I/51aXvjzcukL._SL1500_.jpg",
      },
    ],
  },
  {
    _id: "p3",
    name: "Samsung 4K Smart TV 55-inch",
    description: "Crystal UHD display with HDR10+ and voice assistant.",
    biddingStartPrice: 55000,
    biddingStartDate: "2025-11-11T09:00:00Z",
    biddingStartTime: "2025-11-11T09:00:00Z",
    biddingEndTime: "2025-11-13T09:00:00Z",
    images: [
      {
        secure_url:
          "https://images.samsung.com/is/image/samsung/p6pim/in/qa55qef6aulxl/gallery/in-qled-tv-qa55qef6aulxl------m------qled-qef---k-samsung-vision-ai-smart-tv-titanium-gray-548462798?$684_547_PNG$",
      },
      {
        _id: "p4",
        name: "PS5 Slim Digital Edition",
        category: "Gaming",
        description: "Sony PlayStation 5 slim digital console.",
        biddingStartPrice: 45990,
        biddingStartDate: "2025-11-12T09:00:00Z",
        biddingStartTime: "2025-11-12T09:00:00Z",
        biddingEndTime: "2025-11-13T09:00:00Z",
        images: [
          {
            secure_url:
              "https://m.media-amazon.com/images/I/41c+1Roq2aL._AC_UF894,1000_QL80_.jpg",
          },
        ],
      },
      {
        _id: "p5",
        name: "MacBook Air M3",
        category: "Computers",
        description: "2025 edition with M3 chip and 18-hour battery life.",
        biddingStartPrice: 99999,
        biddingStartDate: "2025-11-12T08:00:00Z",
        biddingStartTime: "2025-11-12T08:00:00Z",
        biddingEndTime: "2025-11-14T08:00:00Z",
        images: [
          {
            secure_url:
              "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-og-202503?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1739216814915",
          },
        ],
      },
    ],
  },
];

const ProductDetailsPopup = ({ productId, onClose }) => {
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isBiddingStarted, setIsBiddingStarted] = useState(false);
  const [isBiddingEnded, setIsBiddingEnded] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Load product from fallback list (UI-only)
  useEffect(() => {
    const found = fallbackProducts.find((p) => p._id === productId);
    setProduct(found || null);
  }, [productId]);

  // Countdown Timer Logic
  useEffect(() => {
    if (!product) return;

    const start = new Date(product.biddingStartDate);
    const startTime = new Date(product.biddingStartTime);
    const end = new Date(product.biddingEndTime);

    start.setUTCHours(startTime.getUTCHours(), startTime.getUTCMinutes(), 0, 0);

    const interval = setInterval(() => {
      const now = new Date().getTime();

      let diff = !isBiddingStarted
        ? start.getTime() - now
        : end.getTime() - now;

      if (diff <= 0) {
        if (!isBiddingStarted) {
          setIsBiddingStarted(true);
        } else {
          setIsBiddingEnded(true);
        }
        diff = 0;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [product, isBiddingStarted]);

  if (!product) return null;

  return (
    <div className="carDetails-popup" onClick={onClose}>
      <button className="carDetails-close-btn" onClick={onClose}>
        X
      </button>

      <div
        className="carDetails-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="carDetails-popup-content-left">
          <h2>{product.name}</h2>

          <p>
            <ImPriceTags /> Price: ₹{product.biddingStartPrice}
          </p>

          <p>
            <MdOutlineDescription /> Description: {product.description}
          </p>

          {/* Countdown Section */}
          <div className="timer">
            <h2>
              BID{" "}
              {isBiddingStarted
                ? isBiddingEnded
                  ? "HAS ENDED"
                  : "ENDS IN "
                : "STARTS IN "}
              <RiMapPinTimeFill />
            </h2>

            <div className="timer__boxes">
              <div className="timer__box">
                <span className="timer__number">{timeLeft.days}</span>
                <span className="timer__label">DAYS</span>
              </div>
              <div className="timer__box">
                <span className="timer__number">{timeLeft.hours}</span>
                <span className="timer__label">HOURS</span>
              </div>
              <div className="timer__box">
                <span className="timer__number">{timeLeft.minutes}</span>
                <span className="timer__label">MINUTES</span>
              </div>
              <div className="timer__box">
                <span className="timer__number">{timeLeft.seconds}</span>
                <span className="timer__label">SECONDS</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="carDetails-btn w-100 mt-3"
            >
              View Item
            </button>
          </div>
        </div>

        <div className="carDetails-popup-content-right">
          <img
            src={product.images[0].secure_url}
            alt="Product"
            className="carDetails-carousel-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
