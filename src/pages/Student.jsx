import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import Loading from "../components/Loading";
import StudentActivities from "../components/Student/StudentActivities";
import CancelledStudentActivities from "../components/Student/CancelledStudentActivities";

import AssessmentForm from "../components/AssessmentForm";
import StudentInfoPopover from "../components/StudentInfoPopover";

export default function Student() {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({});
  const [flag, setFlag] = useState({ name: "", color: "" });
  const [name, setName] = useState("");

  useEffect(() => {
    function getData() {
      const currentStudent = JSON.parse(
        localStorage.getItem("studentData")
      ).find(
        (student) =>
          student.id === JSON.parse(localStorage.getItem("studentId"))
      );
      setStudent(currentStudent);
      const studentName =
        currentStudent.name + " (" + currentStudent.class + ")";
      setName(studentName);
      if (currentStudent.flag) {
        if (currentStudent.flag === "ok") {
          setFlag({ name: "Ok", color: "#20b26b" });
        } else if (currentStudent.flag === "indicate") {
          setFlag({ name: "Indikera", color: "#ffe207" });
        } else if (currentStudent.flag === "danger") {
          setFlag({ name: "Befara", color: "#ff3d4d" });
        }
      }
    }

    if (loading) {
      getData();
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      {localStorage.getItem("studentId") !== null ? (
        loading ? (
          <Loading />
        ) : (
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
                      <StudentInfoPopover student={student} />
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
                  <AssessmentForm student={student} />
                </Card>
              </Col>
              <Col xs={12} md={4}>
                <Card className="p-4 my-2">
                  <h4 className="mb-4" style={{ textAlign: "center" }}>
                    Avslutade aktiviteter
                  </h4>
                  <CancelledStudentActivities
                    student={student}
                    page="student"
                  />
                </Card>
              </Col>
            </Row>
          </Container>
        )
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
