import React, { useState } from "react";
import "./Navbar.css";
import brandLogo from "./Files/images/AutionX.png";
import profileImage from "./Files/images/profile.png";
import nav_mascot from "./Files/images/mascot_navbar.gif";

import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./FIles/components/SearchBar/SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown for categories
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={brandLogo} alt="Brand Logo" />
        </Link>
      </div>

      {/* Mascot */}
      <div className="character-sitting">
        <img src={nav_mascot} alt="Mascot" className="character-image" />
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul>
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>

          {/* Categories Dropdown */}
          <li className="categories-dropdown">
            <button
              aria-haspopup="true"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              Categories ▼
            </button>

            {isOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => navigate("/category/Properties")}>
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Automobiles")}>
                    Technology
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Furnitures")}>
                    Homeappliances
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Beverages")}>
                    Foodbeverage
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Books")}>
                    Stationery
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Antiques")}>
                    Antiques
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Currencies")}>
                    Others
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/sell">
              <button>Sell an Item</button>
            </Link>
          </li>

          <li>
            <Link to="/bid">
              <button>Bid an Item</button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar (Desktop) */}
      <div className="search-bar desktop-search-bar">
        <SearchBar />
      </div>

      {/* Profile Button (UI Only) */}
      <div className="profile-btn">
        <button>
          <img
            src={profileImage}
            alt="Profile Icon"
            className="profile-image"
          />
        </button>

        <ul className="dropdown-menu profile-dropdown">
          <li>
            <button onClick={() => navigate("/myprofile")}>My Profile</button>
          </li>
          <li>
            <button onClick={() => navigate("/balance")}>Add Money</button>
          </li>
          <li>
            <button onClick={() => navigate("/orders")}>My Bids</button>
          </li>
          <li>
            <button onClick={() => navigate("/pendingbids")}>
              Pending Bids
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/feedback")}>
              Help & Feedback
            </button>
          </li>
          <li>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ✖
        </button>

        <ul className="ListOption">
          {/* Sidebar Categories */}
          <li className="categories-dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>Categories ▼</button>

            {isOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => navigate("/category/Properties")}>
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Automobiles")}>
                    Automobiles & Electronics
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Furnitures")}>
                    Furniture
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Beverages")}>
                    Foods & Beverages
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Currencies")}>
                    Currency
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Books")}>
                    Books & Painting
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/category/Antiques")}>
                    Antiques
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/sell">
              <button>Sell an Item</button>
            </Link>
          </li>
          <li>
            <Link to="/bid">
              <button>Bid an Item</button>
            </Link>
          </li>
        </ul>

        {/* Sidebar Search */}
        <div className="sidebar-search">
          <SearchBar />
        </div>

        {/* Sidebar Logo */}
        <div className="logo slidebarLogo">
          <Link to="/">
            <img src={brandLogo} alt="Brand Logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
