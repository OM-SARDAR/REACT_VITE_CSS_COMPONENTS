import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Payment_Page.css";

import gpay from "./Images/Gpay.png";
import phonepay from "./Images/PhonePe.png";
import debit from "./Images/debit.png";
import credit from "./Images/credit.png";
import netbank from "./Images/net-banking-icon.png";

const PaymentPage = () => {
  const [amount, setAmount] = useState(1000); // demo available balance
  const [customAmount, setCustomAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // change fixed amount buttons
  const handleAmountChange = (value) => {
    setCustomAmount(String(value));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const donateNow = () => {
    if (customAmount < 500) {
      setErrorMessage("Amount must be at least ₹500");
      return;
    }

    alert(`Demo Payment Successful! Added ₹${customAmount}`);

    setAmount((prev) => prev + Number(customAmount));
    setErrorMessage("");
    setCustomAmount("");
  };

  useEffect(() => {
    // Simulate fetching user balance
    setTimeout(() => {
      setAmount(1200); // demo initial amount
    }, 500);
  }, []);

  return (
    <div className="payment-page-body">
      <div className="PAYMENT-container mt-5 mb-5 payment-page">
        {/* Available Balance */}
        <div className="available-money">Available Money: ₹{amount}</div>

        {/* Title */}
        <div className="row justify-content-between">
          <div className="col">
            <h2>Funds</h2>
          </div>
        </div>

        {/* Enter Amount */}
        <div className="text-center mt-4">
          <h3>Enter Amount</h3>

          <div className="input-group w-25 mx-auto">
            <span className="input-group-text">₹</span>
            <input
              type="text"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="form-control"
              placeholder="Enter amount"
            />
          </div>

          <div className="mt-3">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleAmountChange(500)}
            >
              +500
            </button>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => handleAmountChange(1000)}
            >
              +1000
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleAmountChange(1500)}
            >
              +1500
            </button>
          </div>
        </div>

        {/* Add Money */}
        <div className="text-center mt-4">
          <button
            className={`btn ${
              customAmount < 500
                ? "PAYMENT-btn-secondary"
                : "PAYMENT-btn-success"
            } btn-lg`}
            disabled={customAmount < 500}
            onClick={donateNow}
          >
            Add Money
          </button>

          {customAmount < 500 && customAmount !== "" && (
            <div className="text-danger mt-3">
              <h4>Amount must be at least ₹500</h4>
            </div>
          )}

          {errorMessage && (
            <div className="text-danger mt-3">
              <h4>{errorMessage}</h4>
            </div>
          )}
        </div>

        {/* Payment Options */}
        <div className="payment-options-section mt-5">
          <h5>Payment Options</h5>

          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <img src={phonepay} alt="PhonePe" className="me-3" width="40" />
                <span>PhonePe</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>

          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={gpay} alt="GPay" className="me-3" width="40" />
                <span>GPay</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>

          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={credit}
                  alt="Credit Card"
                  className="me-3"
                  width="40"
                />
                <span>Credit Card</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>

          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={debit} alt="Debit Card" className="me-3" width="40" />
                <span>Debit Card</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>

          <div className="list-group mt-3" onClick={donateNow}>
            <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={netbank}
                  alt="Net Banking"
                  className="me-3"
                  width="40"
                />
                <span>Net Banking</span>
              </div>
              <span>Pay via Auction X Bank</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
