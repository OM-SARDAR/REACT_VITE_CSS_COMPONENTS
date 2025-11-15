import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

// Local fallback product list (UI only)
const fallbackProducts = [
  { _id: "1", name: "Fallback Phone" },
  { _id: "2", name: "Fallback Laptop" },
  { _id: "3", name: "Fallback TV" },
  { _id: "4", name: "Fallback Watch" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const text = e.target.value;
    setQuery(text);

    if (!text) {
      setSuggestions([]);
      return;
    }

    const results = fallbackProducts
      .filter((p) => p.name.toLowerCase().includes(text.toLowerCase()))
      .slice(0, 5);

    setSuggestions(results);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (item) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/posts/${item._id}`);
  };

  const handleSearch = () => {
    const selected = suggestions[activeIndex];

    if (selected) {
      navigate(`/posts/${selected._id}`);
      setQuery("");
      setSuggestions([]);
      return;
    }

    const match = fallbackProducts.find((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      navigate(`/posts/${match._id}`);
      setQuery("");
      setSuggestions([]);
    } else {
      alert("No matching product found (offline mode)");
    }
  };

  return (
    <div className="search-and-post-detail">
      <div className="search-bar-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
          />

          <button type="submit" className="search-button">
            <i className="fa-solid fa-search"></i>
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <ul className="suggestions-list">
              {suggestions.map((item, index) => (
                <li
                  key={item._id}
                  onClick={() => handleSuggestionClick(item)}
                  className={`suggestion-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
