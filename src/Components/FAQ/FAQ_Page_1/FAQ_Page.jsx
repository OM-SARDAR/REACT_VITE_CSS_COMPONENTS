import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPenAlt,
  faUser,
  faRocket,
  faHome,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

import "./FAQ_Page.css";

export default function FAQ() {
  return (
    <Container className="faq-container">
      <section>
        <h3 className="text-center mb-4 pb-2 faq-heading">FAQ</h3>
        <p className="text-center mb-5">
          Find the answers for the most frequently asked questions below
        </p>

        <Row>
          <Col md={6} lg={4} className="mb-4">
            <h6 className="mb-3 faq-question">
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-primary pe-2"
              />
              A simple question?
            </h6>
            <p>
              <strong>
                <u>Absolutely!</u>
              </strong>{" "}
              We work with top payment companies which guarantees your safety
              and security.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <h6 className="mb-3 faq-question">
              <FontAwesomeIcon icon={faPenAlt} className="text-primary pe-2" />A
              question that is longer than the previous one?
            </h6>
            <p>
              <strong>
                <u>Yes, it is possible!</u>
              </strong>{" "}
              You can cancel your subscription anytime in your account.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <h6 className="mb-3 faq-question">
              <FontAwesomeIcon icon={faUser} className="text-primary pe-2" />A
              simple question?
            </h6>
            <p>Currently, we only offer monthly subscription.</p>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <h6 className="mb-3 faq-question">
              <FontAwesomeIcon icon={faRocket} className="text-primary pe-2" />A
              simple question?
            </h6>
            <p>
              Yes. Go to the billing section of your dashboard and update your
              payment information.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <h6 className="mb-3 faq-question">
              <FontAwesomeIcon icon={faHome} className="text-primary pe-2" />A
              simple question?
            </h6>
            <p>
              <strong>
                <u>Unfortunately no.</u>
              </strong>{" "}
              We do not issue refunds.
            </p>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <h6 className="mb-3 faq-question">
              <FontAwesomeIcon
                icon={faBookOpen}
                className="text-primary pe-2"
              />
              Another question that is longer than usual
            </h6>
            <p>
              Of course! We’re happy to offer a free plan to anyone who wants to
              try our service.
            </p>
          </Col>
        </Row>
      </section>
    </Container>
  );
}
