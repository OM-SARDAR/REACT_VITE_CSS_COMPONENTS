import React, { useState, useEffect, useCallback } from "react";
import "./Product_List.css";
import { useNavigate } from "react-router-dom";
import { GiSandsOfTime } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import ReactDOM from "react-dom";
import ProductDetailsPopup from "../Product_List_1/FIles/components/ProductDetailsPopup/ProductDetailsPopup";

const Product_List = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 11;

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenPopup = (id) => setSelectedProductId(id);
  const handleClosePopup = () => setSelectedProductId(null);

  // Shuffle helper
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // UI-ONLY DEMO PRODUCT DATA
  const demoData = [
    {
      _id: "p1",
      name: "Apple iPhone 15 Pro",
      description: "Latest iPhone with A17 Pro chip and titanium body.",
      biddingStartPrice: 125000,
      status: "Active",
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
      status: "Active",
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
      status: "Active",
      biddingStartDate: "2025-11-11T09:00:00Z",
      biddingStartTime: "2025-11-11T09:00:00Z",
      biddingEndTime: "2025-11-13T09:00:00Z",
      images: [
        {
          secure_url:
            "https://images.samsung.com/is/image/samsung/p6pim/in/qa55qef6aulxl/gallery/in-qled-tv-qa55qef6aulxl------m------qled-qef---k-samsung-vision-ai-smart-tv-titanium-gray-548462798?$684_547_PNG$",
        },
      ],
    },
  ];

  // LOAD demo data ONLY (UI component mode)
  useEffect(() => {
    const randomized = shuffleArray(demoData);
    setProducts(randomized);
    setDisplayedProducts(randomized.slice(0, productsPerPage));
  }, []);

  // Infinite Scroll Loader
  const loadMoreProducts = useCallback(() => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const nextIndex = currentIndex + productsPerPage;

      setDisplayedProducts((prev) => [
        ...prev,
        ...products.slice(currentIndex, nextIndex),
      ]);

      setCurrentIndex(nextIndex);
      setLoading(false);
    }, 1200);
  }, [currentIndex, loading, products]);

  const handleScroll = (e) => {
    const bottomReached =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;

    if (bottomReached) loadMoreProducts();
  };

  // Countdown Logic (UI only)
  const [liveCountdown, setLiveCountdown] = useState({});

  const calculateTimeLeft = (startDate, startTime, endTime) => {
    if (!startDate || !startTime || !endTime) return "Not available";

    const start = new Date(startDate);
    const start_clock = new Date(startTime);
    start.setUTCHours(
      start_clock.getUTCHours(),
      start_clock.getUTCMinutes(),
      0
    );

    const end = new Date(endTime);
    const now = new Date();

    let diff;

    if (now >= start) diff = end - now;
    else diff = start - now;

    if (diff <= 0) return "Time expired";

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    return `${d}d ${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = {};

      displayedProducts.forEach((p) => {
        updated[p._id] = calculateTimeLeft(
          p.biddingStartDate,
          p.biddingStartTime,
          p.biddingEndTime
        );
      });

      setLiveCountdown(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [displayedProducts]);

  return (
    <div className="Product-body">
      <div id="result" className="Product-container" onScroll={handleScroll}>
        {displayedProducts.map((product) => (
          <div className="product-item" key={product._id}>
            <img
              src={product.images[0]?.secure_url}
              alt={product.name}
              width="100%"
            />

            <h3>{product.name}</h3>

            <h4>
              <ImPriceTags /> ₹{product.biddingStartPrice}
            </h4>

            <h4>
              <GiSandsOfTime /> {liveCountdown[product._id] || "Loading..."}
            </h4>

            <div className="product-btn-box">
              <button onClick={() => handleOpenPopup(product._id)}>
                Bid Now
              </button>
            </div>
          </div>
        ))}

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Popup Portal */}
        {selectedProductId &&
          ReactDOM.createPortal(
            <div className="carDetails-popup">
              <ProductDetailsPopup
                productId={selectedProductId}
                onClose={handleClosePopup}
              />
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Product_List;
