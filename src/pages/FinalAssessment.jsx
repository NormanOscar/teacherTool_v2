import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function FinalAssessment() {
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [tickChecked, setTickChecked] = useState(false);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  useEffect(() => {
    if (!localStorage.getItem("login") || !localStorage.getItem("userId")) {
      window.location.href = "/login";
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
    };

    const studentId = JSON.parse(localStorage.getItem("studentId"));
    const students = JSON.parse(localStorage.getItem("studentData"))
    const student = students.find((student) => student.id === studentId);

    student.finalAssessment = assessment;

    localStorage.setItem("studentData", JSON.stringify(students));

    window.location.href = "/summary";
  }

  const handleTextChange = (e) => {
    setInputResult({ msg: null, type: null });

    switch(e.target.id) {
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
  }

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
                  <h3 className="student-name d-inline-block">Slutbedömning</h3>
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
                  <label style={{ margin: 0 }} htmlFor="good">
                    Vad har gått bra? <span className="required-symbol">*</span>
                  </label>
                  <textarea
                    className="form-control border border-2 form-text"
                    rows="4"
                    id="good"
                    style={{ resize: "none" }}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label style={{ margin: 0 }} htmlFor="bad">
                    Vad har gått mindre bra? <span className="required-symbol">*</span>
                  </label>
                  <textarea
                    className="form-control border border-2 form-text"
                    rows="4"
                    id="bad"
                    style={{ resize: "none" }}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label style={{ margin: 0 }} htmlFor="nextStep">
                    Vad är nästa steg? <span className="required-symbol">*</span>
                  </label>
                  <textarea
                    className="form-control border border-2 form-text"
                    rows="4"
                    id="nextStep"
                    style={{ resize: "none" }}
                    onChange={handleTextChange}
                  />
                </div>
                <div className="form-check mb-2">
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Flagga för extra anpassning
                  </label>
                  <input
                    className="form-check-input border border-2"
                    type="checkbox"
                    id="flexCheckDefault"
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
                      Slutför bedömning
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