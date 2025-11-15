import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { InputGroup, Row, Col, Button, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-hot-toast";
import "./Feedback_Page.css";

function FeedbackForm() {
  const [displayForm, setDisplayForm] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkedVal, setCheckedVal] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    setName(localStorage.getItem("name") || "");
  }, []);

  const feedbackType = {
    qos: "How easy was it to place a bid on items?",
    qob: "How would you rate the support you received from our team?",
    roc: "Was it easy to find the items you were looking for?",
    exp: "Please rate your overall experience.",
  };

  const feedbackOpts = ["Excellent", "Good", "Bad"];

  const handleOnChange = (isChecked, value) => {
    const prefix = value.split("_")[0];
    let temp = [...checkedVal];

    if (isChecked) {
      temp = temp.filter((item) => !item.startsWith(prefix));
      temp.push(value);
    } else {
      temp = temp.filter((item) => item !== value);
    }

    setCheckedVal(temp);
  };

  const validateForm = () => {
    setShowErrors(true);

    if (!name.trim()) {
      setErrorMsg("Name is required");
      return false;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMsg("Invalid Email");
      return false;
    }

    if (!phone || phone.length < 10) {
      setErrorMsg("Invalid Phone Number");
      return false;
    }

    const totalQuestions = Object.keys(feedbackType).length;
    if (checkedVal.length < totalQuestions) {
      setErrorMsg("Please select an option for every question");
      return false;
    }

    return true;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/products/submit", {
        email,
        name,
        phone,
        feedback: checkedVal,
      });

      toast.success("Feedback sent successfully!");
      setDisplayForm(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div
      style={{ marginTop: "170px", marginBottom: "100px" }}
      className="Feedback-Page"
    >
      <Container>
        {displayForm ? (
          <Card>
            <Card.Header>
              <cite>
                We are committed to providing you the best Auction experience
                possible. Your feedback matters!
              </cite>
            </Card.Header>

            <Container className="padding30px">
              <Form onSubmit={formSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="required-field">
                        Customer Name
                      </Form.Label>
                      <Form.Control type="text" value={name} readOnly />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label className="required-field">
                        Email Address
                      </Form.Label>
                      <Form.Control type="email" value={email} readOnly />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label className="required-field">Phone</Form.Label>
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone}
                      />
                      {showErrors && (!phone || phone.length < 10) && (
                        <Alert variant="danger" className="mt-2">
                          {errorMsg}
                        </Alert>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  {Object.keys(feedbackType).map((type) => (
                    <Col md={6} key={type}>
                      <Form.Group>
                        <Form.Label className="required-field">
                          {feedbackType[type]}
                        </Form.Label>
                        <div>
                          {feedbackOpts.map((opt, i) => (
                            <Form.Check
                              inline
                              key={`${type}_${i}`}
                              label={opt}
                              type="radio"
                              name={type}
                              checked={checkedVal.includes(`${type}_${opt}`)}
                              onChange={(e) =>
                                handleOnChange(
                                  e.target.checked,
                                  `${type}_${opt}`
                                )
                              }
                            />
                          ))}
                        </div>
                      </Form.Group>

                      {showErrors &&
                        !checkedVal.some((item) => item.startsWith(type)) && (
                          <Alert variant="danger" className="mt-2">
                            {errorMsg}
                          </Alert>
                        )}
                    </Col>
                  ))}
                </Row>

                <Button type="submit" className="btn_purp mt-3">
                  Submit Review
                </Button>
              </Form>
            </Container>
          </Card>
        ) : (
          <Card className="text-center p-5">
            <h3>Thank you for your feedback!</h3>
            <p>We will work hard to improve your experience.</p>
            <Button
              className="btn_purp mt-3"
              onClick={() => (window.location.href = "/")}
            >
              Close
            </Button>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default FeedbackForm;
