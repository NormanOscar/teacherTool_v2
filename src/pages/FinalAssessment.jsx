import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import StudentInfoPopover from "../components/StudentInfoPopover";
import { getCurrentDate, checkLoginAndData } from "../components/func";

export default function FinalAssessment() {
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [tickChecked, setTickChecked] = useState(false);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });
  const [student, setStudent] = useState({});
  const [date, setDate] = useState(getCurrentDate());

  useEffect(() => {
    setStudent(
      JSON.parse(localStorage.getItem("studentData")).find(
        (student) =>
          student.id === JSON.parse(localStorage.getItem("studentId"))
      )
    );

    if (
      localStorage.getItem("finalAssessmentId")) {
      const currentStudent = JSON.parse(
        localStorage.getItem("studentData")
      ).find(
        (student) =>
          student.id === JSON.parse(localStorage.getItem("studentId"))
      );
      const finalAssessment = currentStudent.finalAssessments.find(
        (assessment) =>
          assessment.id ===
          JSON.parse(localStorage.getItem("finalAssessmentId"))
      );
      setGood(finalAssessment.good);
      setBad(finalAssessment.bad);
      setNextStep(finalAssessment.nextStep);
      setTickChecked(finalAssessment.tickChecked);
      setDate(finalAssessment.date);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (good === "" && bad === "" && nextStep === "") {
      setInputResult({ msg: "Fyll i alla fält", type: "danger" });
      return;
    }

    const assessment = {
      good: good,
      bad: bad,
      nextStep: nextStep,
      tickChecked: tickChecked,
      date: date,
      id: 0,
      teacher: JSON.parse(localStorage.getItem("userId")),
    };

    if (student.finalAssessments && student.finalAssessments.length > 0) {
      assessment.id =
        student.finalAssessments[student.finalAssessments.length - 1].id + 1;
    }

    const studentId = JSON.parse(localStorage.getItem("studentId"));
    const students = JSON.parse(localStorage.getItem("studentData"));
    const currentStudent = students.find((student) => student.id === studentId);

    if (!currentStudent.finalAssessments) {
      currentStudent.finalAssessments = [];
    }
    currentStudent.finalAssessments.push(assessment);

    localStorage.setItem("studentData", JSON.stringify(students));
    localStorage.setItem("finalAssessmentId", assessment.id);

    window.location.href = "/summary";
  };

  const handleTextChange = (e) => {
    setInputResult({ msg: null, type: null });

    switch (e.target.id) {
      case "good":
        setGood(e.target.value);
        break;
      case "bad":
        setBad(e.target.value);
        break;
      case "nextStep":
        setNextStep(e.target.value);
        break;
      default:
        break;
    }
  };

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
                {student.name + " (" + student.class + ")"} - Slutbedömning
              </h3>
            </Container>
          </Col>
          <Col xs={12} md={2}></Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={4}>
            <Card className="p-3 my-2">
              <form>
                {inputResult.type !== null && (
                  <div
                    className={
                      inputResult.type === "danger"
                        ? "alert alert-danger"
                        : "alert alert-success"
                    }
                    role="alert"
                  >
                    {inputResult.msg}
                  </div>
                )}
                <div className="form-outline mb-2">
                  <label style={{ margin: 0 }} htmlFor="date">
                    Datum <span className="required-symbol">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control border border-2"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label style={{ margin: 0 }} htmlFor="good">
                    Vad har gått bra? <span className="required-symbol">*</span>
                  </label>
                  <textarea
                    className="form-control border border-2 form-text"
                    rows="4"
                    id="good"
                    style={{ resize: "none" }}
                    value={good}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label style={{ margin: 0 }} htmlFor="bad">
                    Vad har gått mindre bra?{" "}
                    <span className="required-symbol">*</span>
                  </label>
                  <textarea
                    className="form-control border border-2 form-text"
                    rows="4"
                    id="bad"
                    style={{ resize: "none" }}
                    value={bad}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label style={{ margin: 0 }} htmlFor="nextStep">
                    Vad är nästa steg?{" "}
                    <span className="required-symbol">*</span>
                  </label>
                  <textarea
                    className="form-control border border-2 form-text"
                    rows="4"
                    id="nextStep"
                    style={{ resize: "none" }}
                    value={nextStep}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-check mb-2">
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Flagga för extra anpassning
                  </label>
                  <input
                    className="form-check-input border border-2"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={tickChecked}
                    onChange={(e) => setTickChecked(e.target.checked)}
                  />
                </div>
                <Row className="mt-3">
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      {localStorage.getItem("finalAssessmentId") &&
                      student.finalAssessment
                        ? "Uppdatera"
                        : "Slutför bedömning"}
                    </button>
                  </div>
                </Row>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
