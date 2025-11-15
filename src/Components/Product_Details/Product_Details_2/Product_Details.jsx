import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product_Details.css";

const DetailedOrderPage = () => {
  const [order, setOrder] = useState(null);

  // ---- DEMO ORDER DATA (UI ONLY) ----
  const demoOrder = {
    _id: "1",
    name: "Amit Kumar",
    address: "221B Baker Street, London",
    phoneNo: "9876543210",
    title: "Premium Smartwatch",
    sellerEmail: "seller@example.com",
    biddingStartPrice: 999,
    highestBid: 1499,
    createdAt: new Date().toISOString(),
    images: [
      {
        secure_url:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      },
    ],
  };

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => {
      setOrder(demoOrder);
    }, 600);
  }, []);

  // Loading screen
  if (!order) return <p>Loading...</p>;

  return (
    <div className="BidHistoryDetails-container">
      <div className="row">
        {/* Delivery Address */}
        <div className="col-md-4 up-details">
          <div className="card p-3 mb-3">
            <h5>Delivery Address</h5>
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <p>Phone number: {order.phoneNo}</p>
          </div>
        </div>

        {/* Rewards */}
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h6 style={{ fontSize: "20px", textAlign: "center" }}>
              You won the Bid
            </h6>

            <div className="col-md-6 rounded img-of-div mx-auto">
              <img
                src={
                  order.images?.[0]?.secure_url ||
                  "https://via.placeholder.com/150"
                }
                className="img-fluid middling-image"
                alt={order.title}
              />
            </div>
          </div>
        </div>

        {/* More Actions */}
        <div className="col-md-4">
          <div className="card p-3 mb-3 text-center">
            <h5>More Actions</h5>

            {/* Dummy Invoice Button */}
            <button
              className="btn btn-outline-primary"
              onClick={() => alert("Demo: Invoice would be downloaded")}
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="card p-3 mb-3">
        <h5>{order.title}</h5>
        <p>Seller: {order.sellerEmail}</p>
        <p>Price: ₹{order.biddingStartPrice}</p>

        <div className="d-flex justify-content-between">
          <p>Highest Bid: ₹{order.highestBid}</p>
          <p>
            Date of winning: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <p className="text-muted">
          Product has no-return policy.{" "}
          <span className="text-primary" style={{ cursor: "pointer" }}>
            Know more
          </span>
        </p>

        <div className="mt-2">
          <button
            className="btn btn-primary me-2"
            onClick={() => alert("Demo: Rate & Review page")}
          >
            Rate & Review Product
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => alert("Demo: Open Chat Support")}
          >
            Chat with us
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedOrderPage;
