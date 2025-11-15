import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact_Us.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Auto-fill name and email from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    setFormData((prevData) => ({
      ...prevData,
      name: storedName,
      email: storedEmail,
    }));
  }, []);

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fake submit (UI only)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setStatusMessage("Message sent successfully! (Demo Only)");
      setIsSubmitting(false);

      // Reset form except name/email
      setFormData((prev) => ({
        ...prev,
        subject: "",
        message: "",
      }));
    }, 1000);
  };

  return (
    <div className="contact-page">
      <h2 className="mb-4 head1 text-white mt-3">CONTACT US</h2>

      <Row>
        {/* Contact Form */}
        <Col md={5} sm={5} className="contact-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Control
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formSubject" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              className="contact-btn mt-3"
              variant="warning"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send Message"}
            </Button>

            {statusMessage && (
              <p className="text-success mt-3">{statusMessage}</p>
            )}
          </Form>
        </Col>

        {/* Map + Info */}
        <Col md={6} sm={12} className="mt-4 mt-md-0">
          <div className="contact-map-container">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=13RYCmCKJ3-Rzs6hzfnXwT-tsJrkZubw&ehbc=2E312F"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="contact-info mt-3">
            <p>
              <i className="fas fa-map-marker-alt"></i> Pailan College of
              Technology and Management, West Bengal, India
            </p>
            <p>
              <i className="fas fa-envelope"></i> support@auctionx.com
            </p>
            <p>
              <i className="fas fa-phone"></i> +91 9876543210
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
