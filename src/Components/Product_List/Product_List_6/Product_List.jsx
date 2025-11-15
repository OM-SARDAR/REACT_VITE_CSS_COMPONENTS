import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product_List.css";

const SellerHistoryPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- DEMO LISTINGS (UI ONLY) ----
  const demoListings = [
    {
      _id: "1",
      name: "Vintage Camera",
      description: "A classic vintage camera in working condition.",
      category: "Electronics",
      email: "seller@example.com",
      mobileNumber: "9876543210",
      biddingStartPrice: 1500,
      biddingStartTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour later
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1519183071298-a2962be96c59?w=600",
        },
      ],
    },
    {
      _id: "2",
      name: "Gaming Mouse",
      description: "RGB gaming mouse with high DPI.",
      category: "Computers",
      email: "seller@example.com",
      mobileNumber: "9998887776",
      biddingStartPrice: 800,
      biddingStartTime: new Date(Date.now() + 7200 * 1000).toISOString(), // 2 hours later
      images: [
        {
          secure_url:
            "https://images.unsplash.com/photo-1584270354954-5cd2b07f43bb?w=600",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setListings(
        demoListings.map((item) => ({
          ...item,
          timeLeft: calculateTimeLeft(item.biddingStartTime),
        }))
      );
      setLoading(false);
    }, 700);
  }, []);

  const calculateTimeLeft = (time) => {
    if (!time) return "Date not available";

    const endTime = new Date(time);
    const now = new Date();

    const diff = endTime - now;
    if (diff <= 0) return "Time expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} hours, ${minutes} minutes`;
  };

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setListings((prev) =>
        prev.map((listing) => ({
          ...listing,
          timeLeft: calculateTimeLeft(listing.biddingStartTime),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEdit = (id) => {
    alert(`Demo: Edit listing (id: ${id})`);
  };

  const handleDelete = (id) => {
    const listing = listings.find((l) => l._id === id);
    if (!listing) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${listing.name}"?`
    );

    if (confirmDelete) {
      setListings((prev) => prev.filter((l) => l._id !== id));
      alert(`"${listing.name}" deleted (Demo Mode)`);
    }
  };

  if (loading) return <p>Loading your listings...</p>;

  return (
    <div className="sellhistory-container">
      <h2 className="sellhistory-title">Your Listings</h2>

      {listings.length === 0 ? (
        <p className="nolist">No listings found.</p>
      ) : (
        listings.map((listing) => (
          <div className="sellhistory-listing-card" key={listing._id}>
            <div className="sellhistory-listing-content">
              {/* Image */}
              <div className="sellhistory-listing-image">
                <img
                  src={
                    listing.images?.[0]?.secure_url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={listing.name}
                />
              </div>

              {/* Details */}
              <div className="sellhistory-listing-details">
                <h5 className="sellhistory-listing-title">{listing.name}</h5>

                <p>
                  <strong>Description:</strong> {listing.description}
                </p>
                <p>
                  <strong>Category:</strong> {listing.category}
                </p>
                <p>
                  <strong>Contact:</strong> {listing.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {listing.mobileNumber}
                </p>
                <p>
                  <strong>Starting Price:</strong> ₹
                  {listing.biddingStartPrice.toFixed(2)}
                </p>

                <p className="sellhistory-ending-time">
                  <strong>Time left:</strong> {listing.timeLeft}
                </p>
              </div>

              {/* Buttons */}
              <div className="sellhistory-listing-actions">
                <button
                  className="sellhistory-btn-edit"
                  onClick={() => handleEdit(listing._id)}
                >
                  Edit
                </button>

                <button
                  className="sellhistory-btn-delete"
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerHistoryPage;
