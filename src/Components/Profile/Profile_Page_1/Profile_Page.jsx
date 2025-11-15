import React, { useState, useEffect, useRef } from "react";
import "./Profile_Page.css";
import pfp from "./Images/profile.png";
import messegeBox from "./Images/messageBox.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faWhatsapp,
  faTelegram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import mascotProfile from "./Images/mascot_profile.gif";

function ProfilePage2() {
  // DEMO PROFILE INFO
  const [profilePic, setProfilePic] = useState(pfp);

  const [profileInfo, setProfileInfo] = useState({
    name: "Om Sardar",
    email: "demo@example.com",
    phoneNo: "9876543210",
    address: "123 Demo Street, India",
    gender: "male",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Chat popup control
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedSubQuestion, setSelectedSubQuestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const answerRef = useRef(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (chatRef.current && !chatRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // FAQ Question Bank
  const questionBank = [
    {
      id: 1,
      question: "What is Auction X?",
      subQuestions: [
        {
          id: "1a",
          question: "What does Auction X offer?",
          answer: "Auction X offers an online bidding platform.",
        },
        {
          id: "1b",
          question: "Who can use Auction X?",
          answer: "Anyone interested in buying or selling via online auctions.",
        },
      ],
    },
    {
      id: 2,
      question: "How does bidding work?",
      subQuestions: [
        {
          id: "2a",
          question: "What is the minimum bid?",
          answer: "It is set by the seller for each item.",
        },
        {
          id: "2b",
          question: "Can I withdraw my bid?",
          answer: "No, bids cannot be withdrawn once placed.",
        },
      ],
    },
  ];

  const handleQuestionClick = (id) => {
    setSelectedQuestionId(selectedQuestionId === id ? null : id);
    setSelectedSubQuestion(null);
    setIsTyping(false);
  };

  const handleSubQuestionClick = (subQuestion) => {
    setSelectedSubQuestion(null);
    setIsTyping(true);

    setTimeout(() => {
      setSelectedSubQuestion(subQuestion);
      setIsTyping(false);

      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }, 1300);
  };

  // Edit Profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (Demo Mode, no backend)");
    setIsEditing(false);
  };

  return (
    <div className="profilebody">
      <div className="container mt-5">
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-md-4">
            <div className="card profilecard text-center">
              <div className="card-body">
                <img
                  src={profilePic}
                  alt="User Avatar"
                  className="rounded-circle profile-img-fluid"
                  style={{ width: "150px" }}
                />
              </div>
            </div>

            {/* Menu */}
            <div className="card profilecard mt-3 p-1">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/pendingbids">My Bidding History</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/balance">Add Money</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/report">Report Something Suspicious</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="card profilecard mt-3 p-1">
              <ul className="list-group list-group-flush">
                <li className="list-group-item insta">
                  <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                  </a>
                </li>
                <li className="list-group-item faceb">
                  <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} /> Facebook
                  </a>
                </li>
                <li className="list-group-item yt">
                  <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faYoutube} /> Youtube
                  </a>
                </li>
                <li className="list-group-item whatsapp">
                  <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faWhatsapp} /> Whatsapp
                  </a>
                </li>
                <li className="list-group-item tweeter">
                  <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faXTwitter} /> X (Twitter)
                  </a>
                </li>
                <li className="list-group-item telegram">
                  <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faTelegram} /> Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-8">
            <div className="card profilecard mb-3">
              <div className="card-body">
                <div className="d-flex">
                  <h5 className="card-title mb-0">Profile Information</h5>
                  <button
                    className="btn btn-primary btn-sm mt-3 profile-flex-button"
                    onClick={toggleEdit}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Full Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={profileInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Email</label>
                      <input
                        className="form-control"
                        value={profileInfo.email}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        name="phoneNo"
                        value={profileInfo.phoneNo}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Address</label>
                      <input
                        className="form-control"
                        name="address"
                        value={profileInfo.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button className="btn btn-success btn-sm m-2">Save</button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm m-2"
                      onClick={toggleEdit}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="row">
                      <div className="col-sm-3">Full Name</div>
                      <div className="col-sm-9 text-muted">
                        {profileInfo.name}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">Email</div>
                      <div className="col-sm-9 text-muted">
                        {profileInfo.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">Phone</div>
                      <div className="col-sm-9 text-muted">
                        {profileInfo.phoneNo}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">Address</div>
                      <div className="col-sm-9 text-muted">
                        {profileInfo.address}
                      </div>
                    </div>

                    <img
                      src={mascotProfile}
                      className="bottom-right-image"
                      alt="Mascot"
                    />

                    <img
                      src={messegeBox}
                      className="bottom-right-messegeBox"
                      alt="Chat"
                      onClick={togglePopup}
                    />

                    {/* POPUP CHAT */}
                    {isOpen && (
                      <div className="chat-popup-profile" ref={chatRef}>
                        <div className="chat-container-profile">
                          <div className="chat-header-profile">
                            <h2>Auction X Chat</h2>
                            <span>Help 24x7</span>
                          </div>

                          <div className="chat-body-profile">
                            {isTyping ? (
                              <div className="typing-indicator">
                                <p>Typing...</p>
                              </div>
                            ) : (
                              selectedSubQuestion && (
                                <div
                                  ref={answerRef}
                                  className="chat-message-profile"
                                >
                                  <p className="user-question-profile">
                                    Q: {selectedSubQuestion.question}
                                  </p>
                                  <p className="bot-answer-profile">
                                    A: {selectedSubQuestion.answer}
                                  </p>
                                </div>
                              )
                            )}

                            <div className="chat-options-profile">
                              {questionBank.map((q) => (
                                <div key={q.id}>
                                  <button
                                    className="chat-option-profile main-question-profile"
                                    onClick={() => handleQuestionClick(q.id)}
                                  >
                                    {q.question}
                                  </button>

                                  {selectedQuestionId === q.id && (
                                    <div className="sub-questions-profile">
                                      {q.subQuestions.map((sub) => (
                                        <button
                                          key={sub.id}
                                          className="chat-option-profile sub-question-profile"
                                          onClick={() =>
                                            handleSubQuestionClick(sub)
                                          }
                                        >
                                          {sub.question}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="card profilecard">
              <div className="card-body">
                <h3>FAQs</h3>
                <p>
                  <strong>
                    What happens when I update my contact details?
                  </strong>
                </p>
                <p>You will receive updates on your new contact info.</p>

                <p>
                  <strong>Is my account linked across devices?</strong>
                </p>
                <p>Yes, Auction X uses single sign-on.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage2;
