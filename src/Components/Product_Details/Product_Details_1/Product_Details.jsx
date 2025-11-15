import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Carousel,
  Form,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product_Details.css";

import { MdAccountBalanceWallet } from "react-icons/md";
import { RiMapPinTimeFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { ImHammer2 } from "react-icons/im";

const CarDetailsPage = () => {
  const [index, setIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [showBidBox, setShowBidBox] = useState(false);

  // -------------------------
  // DEMO PRODUCT DATA
  // -------------------------
  const demoProduct = {
    name: "Premium Smartwatch",
    biddingStartPrice: 999,
    currentBid: 1299,
    bidderName: "John Doe",
    description:
      "A stylish smartwatch with heart-rate monitor, GPS, notifications, and AMOLED display.",
    images: [
      {
        secure_url:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      },
      {
        secure_url:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      },
      {
        secure_url:
          "https://images.unsplash.com/photo-1580906850130-20ff7a2a02bb?w=800",
      },
    ],
  };

  const sellerDemo = {
    name: "Amit Kumar",
    profilePic:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300",
    balance: 5000,
  };

  return (
    <div style={{ marginTop: "160px", marginBottom: "140px" }}>
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            {/* MAIN IMAGE CAROUSEL */}
            <Card>
              <Carousel activeIndex={index} onSelect={(i) => setIndex(i)}>
                {demoProduct.images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 carousel-image"
                      src={img.secure_url}
                      alt={`Slide ${idx}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card>

            {/* THUMBNAILS */}
            <Row className="mt-3 me-5 ms-5">
              {demoProduct.images.map((img, idx) => (
                <Col key={idx} xs={3} className="thumbnail-col">
                  <Image
                    src={img.secure_url}
                    thumbnail
                    onClick={() => setIndex(idx)}
                    className="thumbnail-image"
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              ))}
            </Row>

            {/* DESCRIPTION */}
            <Col className="pt-3">
              <Card>
                <Card.Body className="description">
                  <h4>Description</h4>
                  <p>{demoProduct.description}</p>
                </Card.Body>
              </Card>
            </Col>
          </Col>

          {/* RIGHT SIDE DETAILS */}
          <Col md={4}>
            <Card>
              <Card.Body>
                <h3>{demoProduct.name}</h3>

                <h5>
                  <ImHammer2 /> Current Bid : ₹{demoProduct.currentBid}
                </h5>

                <h5>
                  <IoPerson /> Current Bidder : {demoProduct.bidderName}
                </h5>

                {/* Static Timer UI */}
                <div className="timer">
                  <h2>
                    BID ENDS IN <RiMapPinTimeFill />
                  </h2>

                  <div className="timer__boxes">
                    <div className="timer__box">
                      <span className="timer__number">01</span>
                      <span className="timer__label">DAYS</span>
                    </div>
                    <div className="timer__box">
                      <span className="timer__number">12</span>
                      <span className="timer__label">HOURS</span>
                    </div>
                    <div className="timer__box">
                      <span className="timer__number">45</span>
                      <span className="timer__label">MINUTES</span>
                    </div>
                    <div className="timer__box">
                      <span className="timer__number">20</span>
                      <span className="timer__label">SECONDS</span>
                    </div>
                  </div>

                  {/* Static button */}
                  <Button
                    variant="danger"
                    className="w-100 mt-3"
                    onClick={() => setShowBidBox(!showBidBox)}
                  >
                    Bid on this
                  </Button>
                </div>

                {/* Bid input box */}
                {showBidBox && (
                  <Card className="mt-3">
                    <Card.Body>
                      <Form.Group controlId="formBidAmount">
                        <Form.Label>Enter Your Bid:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder={`Minimum: ₹${
                            demoProduct.currentBid + 200
                          }`}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                      </Form.Group>

                      <Button className="w-100 mt-3" variant="dark">
                        Submit Bid
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </Card.Body>
            </Card>

            {/* Balance */}
            <Card className="mt-3">
              <Card.Body>
                <h5>
                  <MdAccountBalanceWallet /> Balance : ₹{sellerDemo.balance}
                </h5>
              </Card.Body>
            </Card>

            {/* Seller */}
            <Card className="mt-3">
              <Card.Body>
                <h5>About Seller</h5>

                <Image
                  src={sellerDemo.profilePic}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  roundedCircle
                />

                <p>{sellerDemo.name}</p>
                <h6>Seller's Reputation</h6>
                <p>⭐⭐⭐⭐☆</p>

                <Button variant="outline-secondary" className="w-100">
                  Contact Us
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CarDetailsPage;
