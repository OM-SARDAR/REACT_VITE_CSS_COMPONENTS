import React, { useState, useEffect, useCallback } from "react";
import "./Product_List.css";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { GiSandsOfTime } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ProductDetailsPopup from "../Product_List_1/FIles/components/ProductDetailsPopup/ProductDetailsPopup";

const Product_List = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const productsPerPage = 11;

  // ✅ Demo UI-only products
  const demoProducts = [
    {
      _id: "p1",
      name: "Apple iPhone 15 Pro",
      category: "Electronics",
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
      category: "Audio",
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
      category: "Home Appliances",
      description: "Crystal UHD display with HDR10+ and voice assistant.",
      biddingStartPrice: 55000,
      biddingStartDate: "2025-11-11T09:00:00Z",
      biddingStartTime: "2025-11-11T09:00:00Z",
      biddingEndTime: "2025-11-13T09:00:00Z",
      images: [
        {
          secure_url:
            "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
        },
      ],
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
  ];

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  // Load demo products only (UI mode)
  useEffect(() => {
    const randomized = shuffleArray(demoProducts);
    setProducts(randomized);
    setDisplayedProducts(randomized.slice(0, productsPerPage));

    initializeTimers(randomized);
  }, []);

  // Timer initialization
  const initializeTimers = (products) => {
    products.forEach((product) => {
      const start = new Date(product.biddingStartDate);
      const startTime = new Date(product.biddingStartTime);
      start.setUTCHours(
        startTime.getUTCHours(),
        startTime.getUTCMinutes(),
        0,
        0
      );
      const end = new Date(product.biddingEndTime);

      if (!isNaN(end)) {
        updateTimer(product._id, start, end);
        setInterval(() => updateTimer(product._id, start, end), 1000);
      }
    });
  };

  const updateTimer = (id, start, end) => {
    const now = new Date().getTime();
    const diff = now < start ? start - now : end - now;

    if (diff <= 0) {
      setTimeLeft((prev) => ({
        ...prev,
        [id]: { days: "00", hours: "00", minutes: "00", seconds: "00" },
      }));
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft((prev) => ({
      ...prev,
      [id]: {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      },
    }));
  };

  // Infinite scroll
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
    }, 1500);
  }, [currentIndex, loading, products]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight;
    if (bottom) loadMoreProducts();
  };

  const openPopup = (id) => setSelectedProductId(id);
  const closePopup = () => setSelectedProductId(null);

  return (
    <div className="ProductTwo-body">
      <div id="result" className="ProductTwo-container" onScroll={handleScroll}>
        {displayedProducts.map((product) => (
          <div className="ProductTwo-item" key={product._id}>
            <div className="ProductTwo-item-content">
              <img
                src={product.images[0].secure_url}
                alt={product.name}
                className="ProductTwo-image"
              />

              <div className="ProductTwo-info">
                <h5 className="ProductTwo-name">{product.name}</h5>

                <p>
                  <BiSolidCategoryAlt /> Category: {product.category}
                </p>

                <h5>
                  <ImPriceTags /> ₹{product.biddingStartPrice}
                </h5>

                <p className="ProductTwo-time">
                  <GiSandsOfTime />{" "}
                  {timeLeft[product._id]
                    ? `${timeLeft[product._id].days}d ${
                        timeLeft[product._id].hours
                      }h ${timeLeft[product._id].minutes}m ${
                        timeLeft[product._id].seconds
                      }s`
                    : "Loading..."}
                </p>

                <button
                  className="ProductTwo-button"
                  onClick={() => openPopup(product._id)}
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="ProductTwo-loading">
            <div className="ProductTwo-spinner"></div>
          </div>
        )}
      </div>

      {selectedProductId &&
        ReactDOM.createPortal(
          <div className="carDetails-popup">
            <ProductDetailsPopup
              productId={selectedProductId}
              onClose={closePopup}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default Product_List;
