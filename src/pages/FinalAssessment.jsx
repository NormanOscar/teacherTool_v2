import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Loading from "../components/Loading";

export default function FinalAssessment() {
  return (
    <>
      <Container fluid>
        <Row className="mt-2">
          <Col
            xs={12}
            md={2}
            className="d-flex justify-content-start align-items-center"
          >
            <button
              className="btn btn-primary py-3 px-4"
              onClick={() => (window.location.href = "/analyse")}
            >
              Tillbaka
            </button>
          </Col>
          <Col xs={12} md={8} className="d-flex justify-content-center align-items-center">
            <h1>Final Assessment</h1>
          </Col>
          <Col xs={12} md={2}>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}