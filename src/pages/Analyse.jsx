import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";

import Loading from "../components/Loading";
import Timeline from "../components/Analyse/Timeline";
import AssessmentCard from "../components/Analyse/AssessmentCard";
import ActivityCard from "../components/Analyse/ActivityCard";
import PresentCard from "../components/Analyse/PresentCard";
import StudentInfoPopover from "../components/StudentInfoPopover";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPen, faTrash);

export default function Analyse() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState("");
  const [performances, setPerformances] = useState({
    good: {
      amount: 0,
      percentage: 0,
    },
    neutral: {
      amount: 0,
      percentage: 0,
    },
    bad: {
      amount: 0,
      percentage: 0,
    },
  });

  useEffect(() => {
    function getData() {
      let studentId = JSON.parse(localStorage.getItem("studentId"));
      let students = JSON.parse(localStorage.getItem("studentData"));
      setStudent(students.find((student) => student.id === studentId));
    }

    if (loading) {
      getData();
      setLoading(false);
    }

    if (student.flag) {
      setFlag(student.flag);
    }
  }, [loading]);

  const handleFlagChange = (e) => {
    setFlag(e.target.id);
    let studentId = JSON.parse(localStorage.getItem("studentId"));
    let students = JSON.parse(localStorage.getItem("studentData"));
    let selectedStudent = students.find((student) => student.id === studentId);
    selectedStudent.flag = e.target.id;
    localStorage.setItem("studentData", JSON.stringify(students));
  };

  const handleEditClick = (id) => {
    localStorage.setItem("finalAssessmentId", JSON.stringify(id));
    window.location.href = "/finalAssessment";
  };

  const handleDeleteClick = (id) => {
    let confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort denna slutbedömning?"
    );
    if (!confirmDelete) {
      return;
    }
    let studentId = JSON.parse(localStorage.getItem("studentId"));
    let students = JSON.parse(localStorage.getItem("studentData"));
    let selectedStudent = students.find((student) => student.id === studentId);
    selectedStudent.finalAssessments = selectedStudent.finalAssessments.filter(
      (assessment) => assessment.id !== id
    );
    localStorage.setItem("studentData", JSON.stringify(students));
    window.location.reload();
  };

  return (
    <>
      <Container fluid>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Row className="mt-2">
              <Col
                xs={12}
                md={2}
                className="d-flex justify-content-start align-items-center"
              >
                <button
                  className="btn btn-primary py-3 px-4"
                  onClick={() => (window.location.href = "/student")}
                >
                  Tillbaka
                </button>
              </Col>
              <Col
                xs={12}
                md={8}
                className="d-flex justify-content-center align-items-center"
              >
                <Container className="text-center d-flex justify-content-center">
                  <h3 className="student-name d-inline-block">
                    <span>
                      <StudentInfoPopover student={student} />
                    </span>
                    {student.name + " (" + student.class + ")"} - Analys
                  </h3>
                </Container>
              </Col>
              <Col
                xs={12}
                md={2}
                className="d-flex justify-content-end align-items-center"
              >
                <div className="btn-group">
                  <input
                    type="radio"
                    className="btn-check flag-btn"
                    name="flag-options"
                    id="ok"
                    autoComplete="off"
                    onChange={handleFlagChange}
                    checked={flag === "ok"}
                  />
                  <label
                    className="btn flag-label py-3 px-4"
                    htmlFor="ok"
                    style={{ backgroundColor: "#20b26b" }}
                  >
                    Ok
                  </label>
                  <input
                    type="radio"
                    className="btn-check flag-btn"
                    name="flag-options"
                    id="indicate"
                    autoComplete="off"
                    onChange={handleFlagChange}
                    checked={flag === "indicate"}
                  />
                  <label
                    className="btn flag-label py-3 px-4"
                    htmlFor="indicate"
                    style={{ backgroundColor: "#ffe207" }}
                  >
                    Indikera
                  </label>
                  <input
                    type="radio"
                    className="btn-check flag-btn"
                    name="flag-options"
                    id="danger"
                    autoComplete="off"
                    onChange={handleFlagChange}
                    checked={flag === "danger"}
                  />
                  <label
                    className="btn flag-label py-3 px-4"
                    htmlFor="danger"
                    style={{ backgroundColor: "#ff3d4d", color: "white" }}
                  >
                    Befara
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                <ActivityCard student={student} performances={performances} />
              </Col>
              <Col xs={12} md={4}>
                <AssessmentCard student={student} />
              </Col>
              <Col xs={12} md={4}>
                <PresentCard
                  student={student}
                  setPerformances={setPerformances}
                />
                <Card className="p-4 my-2">
                  <Row className="text-center mb-2">
                    <h4>Slutbedömningar</h4>
                  </Row>
                  <Row>
                    <ul
                      className="list-group overflow-auto custom-scrollbar px-3 mb-4"
                      style={{ maxHeight: "360px" }}
                    >
                      {student.finalAssessments &&
                      student.finalAssessments.length > 0 ? (
                        student.finalAssessments
                          .sort((a, b) => new Date(b.date) - new Date(a.date))
                          .map((finalAssessment, index) => (
                            <li
                              key={finalAssessment.id}
                              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center ps-0"
                              style={{ cursor: "pointer" }}
                              onClick={() => (
                                localStorage.setItem(
                                  "finalAssessmentId",
                                  JSON.stringify(finalAssessment.id)
                                ),
                                (window.location.href = "/summary")
                              )}
                            >
                              <p className="mb-0 ms-3">
                                {finalAssessment.date}
                              </p>
                              <div>
                                <FontAwesomeIcon
                                  icon={faPen}
                                  size="lg"
                                  className="icons mx-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(finalAssessment.id);
                                  }}
                                  style={{ width: "fit-content" }}
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  size="lg"
                                  color="red"
                                  className="icons mx-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(finalAssessment.id);
                                  }}
                                  style={{ width: "fit-content" }}
                                />
                              </div>
                            </li>
                          ))
                      ) : (
                        <p className="text-center m-0">Inga slutbedömningar</p>
                      )}
                    </ul>
                  </Row>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col
                      xs={12}
                      md={8}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <button
                        className="btn btn-primary py-3 px-4"
                        onClick={() => (
                          localStorage.removeItem("finalAssessmentId"),
                          (window.location.href = "/finalAssessment")
                        )}
                      >
                        Gör en slutbedömning
                      </button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Card className="p-4 my-2">
                  <Row className="d-flex justify-content-center">
                    <Timeline />
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
