import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faFilePdf);

export default function Summary() {
  useEffect(() => {
    if (
      !localStorage.getItem("login") ||
      !localStorage.getItem("userId") ||
      !localStorage.getItem("studentData")
    ) {
      window.location.href = "/login";
    }

    const student = JSON.parse(localStorage.getItem("studentData")).find(
      (student) => student.id === JSON.parse(localStorage.getItem("studentId"))
    );
    console.log(student);
  }, []);

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
              Tillbaka till analys
            </button>
          </Col>
          <Col
            xs={12}
            md={8}
            className="d-flex justify-content-center align-items-center"
          >
            <Container className="text-center d-flex justify-content-center">
              <h3 className="student-name d-inline-block">Sammanställning</h3>
            </Container>
          </Col>
          <Col
            xs={12}
            md={2}
            className="d-flex justify-content-end align-items-center"
          >
            <button
              className="btn btn-primary py-3 px-4"
              onClick={() => console.log("Exportera")}
            >
              <span className="mx-2">Exportera till PDF</span>
              <FontAwesomeIcon size="xl" icon="fas fa-file-pdf" />
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
