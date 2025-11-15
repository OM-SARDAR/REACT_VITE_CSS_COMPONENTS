import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product_List.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // DEMO ORDER DATA (UI-only)
  const demoOrders = [
    {
      _id: "1",
      title: "Premium Smartwatch",
      biddingStartPrice: 999,
      highestBid: 1499,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        },
      ],
    },
    {
      _id: "2",
      title: "Action Camera 4K",
      biddingStartPrice: 2999,
      highestBid: 3800,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600",
        },
      ],
    },
    {
      _id: "3",
      title: "Wireless Headphones",
      biddingStartPrice: 1499,
      highestBid: 2100,
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1518449007433-8c72d1fbaa88?w=600",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading delay for UI
    setTimeout(() => {
      setOrders(demoOrders);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="BidHistory-container">
      <h2 className="mb-2 ordercolor">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-white">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="card mb-3" key={order._id}>
            <div className="row g-0">
              <div className="col-md-2">
                <img
                  src={
                    order.images && order.images[0]
                      ? order.images[0].secure_url
                      : "https://via.placeholder.com/150"
                  }
                  className="img-fluid fixed-image"
                  alt={order.title}
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">
                  <h1>{order.title}</h1>

                  <h4>
                    <p className="card-text">
                      Price: ₹{order.biddingStartPrice}
                    </p>

                    <p className="card-text">
                      Highest Bid: ₹{order.highestBid}
                    </p>
                  </h4>
                </div>
              </div>

              <div
                className="col-md-2 text-center"
                style={{ marginTop: "58px" }}
              >
                <Link
                  to={`/order/${order._id}`}
                  className="btn btn-outline-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
