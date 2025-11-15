import React, { useState } from "react";
import "./Product_List.css";
import { GiSandsOfTime } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Product_List = () => {
  const navigate = useNavigate();

  // -------------------------
  // DEMO PRODUCTS WITH REAL IMAGES
  // -------------------------
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
      name: "4K Action Camera",
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
  ];

  const [products] = useState(demoProducts);

  return (
    <div className="Product-body">
      <div id="result" className="Product-container">
        {products.map((product) => (
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

            <p className="ProductTwo-time">
              <GiSandsOfTime /> Time remaining not available
            </p>

            <div className="product-btn-box">
              <button onClick={() => navigate(`/product/${product._id}`)}>
                Bid Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product_List;
