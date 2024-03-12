import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Popover,
} from "react-bootstrap";

import StudentActivities from "../components/Student/StudentActivities";
import CancelledStudentActivities from "../components/Student/CancelledStudentActivities";

import { addStudentsToLocalStorage } from "../components/func";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import AssessmentForm from "../components/AssessmentForm";

library.add(faInfoCircle);

export default function Student() {
  useEffect(() => {
    if (
      !localStorage.getItem("login") ||
      !localStorage.getItem("userId") ||
      !localStorage.getItem("studentData")
    ) {
      window.location.href = "/login";
    }

    addStudentsToLocalStorage();
  }, []);

  let name = "";
  let student = "";
  let flag = {
    name: "",
    color: "",
  };

  if (localStorage.getItem("studentId") !== null) {
    student = JSON.parse(localStorage.getItem("studentData")).find(
      (student) => student.id === JSON.parse(localStorage.getItem("studentId"))
    );
    name = student.name + " (" + student.class + ")";
    if (student.flag) {
      if (student.flag === "ok") {
        flag.name = "Ok";
        flag.color = "#20b26b";
      } else if (student.flag === "indicate") {
        flag.name = "Indikera";
        flag.color = "#ffe207";
      } else if (student.flag === "danger") {
        flag.name = "Befara";
        flag.color = "#ff3d4d";
      }
    }
  } else {
    name = "Du måste välja en elev";
  }

  return (
    <>
      {localStorage.getItem("studentId") !== null ? (
        <Container fluid>
          <Row className="mt-2">
            <Col
              xs={12}
              md={2}
              className="d-flex justify-content-start align-items-center"
            >
              <button
                className="btn btn-primary py-3 px-4"
                onClick={() => (window.location.href = "/")}
              >
                Tillbaka
              </button>
            </Col>
            <Col xs={12} md={8}>
              <Container className="text-center d-flex justify-content-center align-items-center py-2">
                <h3 className="student-name d-inline-block">
                  <span>
                    <OverlayTrigger
                      placement="left-start"
                      trigger="click"
                      overlay={
                        <Popover>
                          <Popover.Header as="h3">
                            {student.name}
                          </Popover.Header>
                          <Popover.Body>
                            <p>
                              <strong>Klass:</strong> {student.class}
                            </p>
                            <p>
                              <strong>Ämne:</strong>{" "}
                              {student.subject == "1"
                                ? "Svenska"
                                : "Svenska som andraspråk"}
                            </p>
                            <p>
                              <strong>Ankomst:</strong> {student.year}
                            </p>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        size="sm"
                        className="mx-2"
                        style={{ cursor: "pointer" }}
                      />
                    </OverlayTrigger>
                  </span>
                  {name}
                </h3>
                {flag.name !== "" && (
                  <>
                    <span>&nbsp;</span>
                    <span
                      className="px-2 py-1"
                      style={{
                        backgroundColor: flag.color,
                        borderRadius: "5px",
                      }}
                    >
                      {flag.name}
                    </span>
                  </>
                )}
              </Container>
            </Col>
            <Col
              xs={12}
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              <button
                className="btn btn-primary px-5 py-3"
                onClick={() => (window.location.href = "/analyse")}
              >
                Analys
              </button>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <h4 className="mb-4" style={{ textAlign: "center" }}>
                  Pågående aktiviteter
                </h4>
                <StudentActivities student={student} page="student" />
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <AssessmentForm student={student}/>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <h4 className="mb-4" style={{ textAlign: "center" }}>
                  Avslutade aktiviteter
                </h4>
                <CancelledStudentActivities student={student} page="student" />
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row className="my-2">
            <Col xs={12} md={4} style={{ paddingTop: "2em" }}></Col>
            <Col xs={12} md={4} style={{ paddingTop: "2em" }}>
              <Card className="p-3 my-4">
                <h4 className="text-center mb-4">Ingen elev vald</h4>
                <button
                  className="btn btn-primary btn-block w-100 mb-2 submitBtn"
                  onClick={() => (window.location.href = "/")}
                >
                  Välj en elev
                </button>
              </Card>
            </Col>
            <Col xs={12} md={4} style={{ paddingTop: "2em" }}></Col>
          </Row>
        </Container>
      )}
    </>
  );
}
