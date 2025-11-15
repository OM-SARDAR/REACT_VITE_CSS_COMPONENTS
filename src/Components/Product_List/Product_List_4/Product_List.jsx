import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImPriceTags } from "react-icons/im";
import ReactDOM from "react-dom";
import "./Product_List.css";

const Product_List = () => {
  const productListRef = useRef(null);
  const navigate = useNavigate();

  // ----------------------------
  // DEMO PRODUCTS WITH REAL IMAGES
  // ----------------------------
  const demoProducts = [
    {
      _id: "1",
      name: "Premium Smartwatch",
      biddingStartPrice: 999,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        },
      ],
    },
    {
      _id: "2",
      name: "Wireless Headphones",
      biddingStartPrice: 1499,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1518449007433-8c72d1fbaa88?w=600",
        },
      ],
    },
    {
      _id: "3",
      name: "Gaming Mouse RGB",
      biddingStartPrice: 699,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1587202372775-e229f172b78d?w=600",
        },
      ],
    },
    {
      _id: "4",
      name: "Action Camera 4K",
      biddingStartPrice: 2999,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600",
        },
      ],
    },
    {
      _id: "5",
      name: "Bluetooth Speaker",
      biddingStartPrice: 899,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600",
        },
      ],
    },
    {
      _id: "6",
      name: "DSLR Camera Lens",
      biddingStartPrice: 4999,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1495435229349-e86db7bfa013?w=600",
        },
      ],
    },
    {
      _id: "7",
      name: "Mechanical Keyboard",
      biddingStartPrice: 2599,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
        },
      ],
    },
  ];

  const [products] = useState(demoProducts);
  const [displayCount, setDisplayCount] = useState(7);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const scroll = (direction) => {
    const slider = productListRef.current;
    if (!slider) return;

    const scrollAmount =
      direction === "left" ? -slider.clientWidth : slider.clientWidth;

    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const loadMoreProducts = () => {
    setDisplayCount((prev) => Math.min(prev + 7, products.length));
  };

  return (
    <div className="list-product-carousel">
      {/* LEFT SCROLL BTN */}
      <button
        className="list-scroll-btn left list-button"
        onClick={() => scroll("left")}
      >
        ❮
      </button>

      {/* PRODUCT SCROLLER */}
      <div className="list-product-list" ref={productListRef}>
        {products.slice(0, displayCount).map((product) => (
          <div key={product._id} className="list-product-card">
            <img
              src={product.images[0]?.secure_url}
              alt={product.name}
              className="list-product-image"
            />

            <p className="list-product-name">{product.name}</p>

            <p className="list-product-price">
              <ImPriceTags /> ₹{product.biddingStartPrice}
            </p>

            <button
              className="list-button2"
              onClick={() => setSelectedProductId(product._id)}
            >
              Bid Now
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT SCROLL BTN */}
      <button
        className="list-scroll-btn right list-button"
        onClick={() => {
          scroll("right");
          loadMoreProducts();
        }}
      >
        ❯
      </button>

      {/* SIMPLE POPUP */}
      {selectedProductId &&
        ReactDOM.createPortal(
          <div className="carDetails-popup">
            <div className="popup-box">
              <h2>Product Details (Demo)</h2>
              <p>Product ID: {selectedProductId}</p>

              <button
                className="list-button2"
                onClick={() => setSelectedProductId(null)}
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Product_List;
