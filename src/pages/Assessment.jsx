import "../styles.css";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Levels from "../components/Levels";
import StudentActivities from "../components/StudentActivities";
import CancelledStudentActivities from "../components/CancelledStudentActivities";
import data from "../json/data.json";
import { useEffect } from "react";
import { addStudentsToLocalStorage, getCurrentDate } from "../components/func";
import { useNavigate } from "react-router-dom";

function saveLocalStorage(data) {
  if (studentInLocalStorage(data.id)) {
    let savedData = JSON.parse(localStorage.getItem("studentData"));
    let student = savedData.filter((student) => student.id === data.id)[0];
    let dataToSave = {
      date: getCurrentDate(),
      gradingTool: data.gradingTools,
      area: data.areas,
      criteria: data.criteria,
      level: data.level,
      comment: data.comment,
    };
    student.assessments.push(dataToSave);
    localStorage.setItem("studentData", JSON.stringify(savedData));
  }
}

function studentInLocalStorage(studentId) {
  let savedData = JSON.parse(localStorage.getItem("studentData"));
  if (savedData !== null) {
    return savedData.find((dataPoint) => dataPoint.id === studentId)
      ? true
      : false;
  }
}

export default function Assessment() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedArea, setSelectedArea] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState(0);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    addStudentsToLocalStorage();
  }, []);
  
  let name = "";
  let student = "";
  
  if (localStorage.getItem("studentId") !== null) {
    student = JSON.parse(localStorage.getItem('studentData')).find(
      (student) => student.id === JSON.parse(localStorage.getItem("studentId"))
    );
    name = student.name + " (åk. " + student.grade + ")";
  } else {
    name = "Du måste välja en elev";
  }

  function handleForm(e) {
    e.preventDefault();

    if (selectedTool === 0) {
      setInputResult({ msg: "Du måste välja bedömningsverktyg", type: "danger" });
      return;
    } else if (selectedArea === 0) {
      setInputResult({ msg: "Du måste välja område", type: "danger" });
      return;
    }else if (selectedCriteria === 0) {
      setInputResult({ msg: "Du måste välja kriterie", type: "danger" });
      return;
    }

    const levelCheck = document.querySelector("#flexCheckDefault");
    const levelSelect = document.querySelector("#level");

    var levelVal;
    if (levelSelect != null) {
      if (levelSelect.value == 0) {
        setInputResult({ msg: "Du måste välja en nivå", type: "danger" });
        return;
      }
      levelVal = levelSelect.value;
    } else {
      levelVal = levelCheck.checked ? "Uppnår" : "Uppnår inte";
    }
    const nameVal = student.name;
    const gradeVal = student.grade;
    let gradingToolVal = data.gradingTools.find(
      (tool) => tool.id === selectedTool
    ).name;

    if (selectedTool === 1) {
      let anyChecked = false;

      document.querySelectorAll(".gradingToolRadio").forEach((radioBtn) => {
        if (radioBtn.checked) {
          anyChecked = true;
          let mergedStr = gradingToolVal.concat(" ", radioBtn.value);
          gradingToolVal = mergedStr;
        }
      });

      if (!anyChecked) {
        setInputResult({ msg: "Du måste välja en nivå på Skolverket", type: "danger" });
        return;
      }
    }
    const areaVal = data.areas.find((area) => area.id === selectedArea).name;
    const criteriaVal = data.criteria.find(
      (criteria) => criteria.id === selectedCriteria
    ).name;
    const commentVal = document.querySelector("#comment").value;

    const studentData = {
      name: nameVal,
      id: student.id,
      grade: gradeVal,
      gradingTools: gradingToolVal,
      areas: areaVal,
      criteria: criteriaVal,
      level: levelVal,
      comment: commentVal,
    };
    saveLocalStorage(studentData);
    handleFormSubmit();
  }

  function handleFormSubmit() {
    setSelectedTool(0);
    setSelectedArea(0);
    setSelectedCriteria(0);
    setInputResult({ msg: "Bedömning sparad!", type: "success" });
  }

  function handleSelectChange(e) {
    switch (e.target.id) {
      case "gradingTool":
        setSelectedTool(parseInt(e.target.value));
        break;
      case "area":
        setSelectedArea(parseInt(e.target.value));
        break;
      case "criteria":
        setSelectedCriteria(parseInt(e.target.value));
        break;
      default:
        break;
    }
    setInputResult({ msg: null, type: null });
  }

  return (
    <>
      {localStorage.getItem("studentId") !== null ? (
        <Container fluid>
          <Container className="text-center">
            <h2 className="student-name d-inline-block">{name}</h2>
          </Container>

          <Row className="mb-2 pt-1">
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <h3 className="mb-4" style={{ textAlign: "center" }}>
                  Pågående aktiviteter
                </h3>
                <StudentActivities
                  student={student}
                  page="assessment"
                />
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <div className="d-flex justify-content-center">
                  <form className="mb-4" id="form-block" onSubmit={handleForm}>
                    <h3 className="mb-4" style={{ textAlign: "center" }}>
                      Bedömning
                    </h3>

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

                    <div className="form-outline mb-2" id="gradingTool-div">
                      <label htmlFor="gradingTool">
                        Bedömningsverktyg: <span className="required-symbol">*</span>
                      </label>
                      <select
                        className="form-select border border-2"
                        id="gradingTool"
                        name="gradingTool"
                        value={selectedTool}
                        onChange={handleSelectChange}
                        required
                      >
                        <option value="0">Välj bedömningsverktyg</option>
                        {data.gradingTools.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedTool === 1 ? (
                      <div className="d-flex">
                        <div className="mx-1">
                          <input
                            type="radio"
                            className="btn-check gradingToolRadio-btn"
                            name="options"
                            id="option1"
                            value="A"
                            /* disabled={
                              student.assessments.length > 0 && student.assessments.find((assessment) => assessment.gradingTool.includes("Skolverket A") || assessment.gradingTool.includes("Skolverket B") || assessment.gradingTool.includes("Skolverket C"))
                            } */
                          />
                          <label
                            className="btn btn-light border border-secondary px-4 gradingToolRadio-label"
                            htmlFor="option1"
                            style={student.assessments.length > 0 && student.assessments.find((assessment) => assessment.gradingTool.includes("Skolverket A") || assessment.gradingTool.includes("Skolverket B") || assessment.gradingTool.includes("Skolverket C")) ? {backgroundColor: "green", color: "white"} : null}
                          >
                            A
                          </label>
                        </div>
                        <div className="mx-1">
                          <input
                            type="radio"
                            className="btn-check gradingToolRadio-btn"
                            name="options"
                            id="option2"
                            value="B"
                            /* disabled={
                              student.assessments.length > 0 && student.assessments.find((assessment) => assessment.gradingTool.includes("Skolverket B") || assessment.gradingTool.includes("Skolverket C"))
                            } */
                          />
                          <label
                            className="btn btn-light border border-secondary px-4  gradingToolRadio-label"
                            htmlFor="option2"
                            style={student.assessments.length > 0 && student.assessments.find((assessment) => assessment.gradingTool.includes("Skolverket B") || assessment.gradingTool.includes("Skolverket C")) ? {backgroundColor: "green", color: "white"} : null}
                          >
                            B
                          </label>
                        </div>
                        <div className="mx-1">
                          <input
                            type="radio"
                            className="btn-check gradingToolRadio-btn"
                            name="options"
                            id="option3"
                            value="C"
                            /* disabled={
                              student.assessments.length > 0 && student.assessments.find((assessment) => assessment.gradingTool.includes("Skolverket C"))
                            } */
                          />
                          <label
                            className="btn btn-light border border-secondary px-4  gradingToolRadio-label"
                            htmlFor="option3"
                            style={student.assessments.length > 0 && student.assessments.find((assessment) => assessment.gradingTool.includes("Skolverket C")) ? {backgroundColor: "green", color: "white"} : null}
                          >
                            C
                          </label>
                        </div>
                      </div>
                    ) : null}

                    {selectedTool !== 0 ? (
                      <div className="form-outline mb-2" id="area-div">
                        <label htmlFor="area">
                          Område: <span className="required-symbol">*</span>
                        </label>
                        <select
                          className="form-select border border-2"
                          id="area"
                          name="area"
                          value={selectedArea}
                          onChange={handleSelectChange}
                          required
                        >
                          <option value="0">Välj område</option>
                          {selectedTool != 0
                            ? data.areas
                                .filter((area) => area.gradingTool.includes(selectedTool))
                                .map((area) => (
                                  <option key={area.name} value={area.id}>
                                    {area.name}
                                  </option>
                                ))
                            : data.areas.map((area) => (
                                <option key={area.name} value={area.id}>
                                  {area.name}
                                </option>
                              ))}
                        </select>
                      </div>
                    ) : null}

                    {selectedTool !== 0 && selectedArea !== 0 ? (
                      <div className="form-outline mb-2" id="criteria-div">
                        <label htmlFor="criteria">
                          Kriteria: <span className="required-symbol">*</span>
                        </label>
                        <select
                          className="form-select border border-2"
                          id="criteria"
                          name="criteria"
                          value={selectedCriteria}
                          onChange={handleSelectChange}
                          required
                        >
                          <option value="0">Välj kriterie</option>
                          {selectedArea != 0 && selectedTool != 0
                            ? data.criteria
                                .filter(
                                  (criteria) =>
                                    criteria.area.includes(selectedArea) &&
                                    criteria.gradingTool.includes(selectedTool)
                                )
                                .map((criteria) => (
                                  <option key={criteria.name} value={criteria.id}>
                                    {criteria.name}
                                  </option>
                                ))
                            : data.criteria.map((criteria) => (
                                <option key={criteria.name} value={criteria.id}>
                                  {criteria.name}
                                </option>
                              ))}
                        </select>
                      </div>
                    ) : null}

                    {selectedCriteria != 0 ? <Levels id={selectedCriteria} /> : null}

                    <div className="form-outline mb-2">
                      <label htmlFor="comment">Kommentar:</label>
                      <textarea
                        className="form-control border border-2 form-text"
                        rows="4"
                        id="comment"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block w-100 mb-2 submitBtn"
                    >
                      Spara
                    </button>
                  </form>
                </div>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <h3 className="mb-4" style={{ textAlign: "center" }}>
                  Avslutade aktiviteter
                </h3>
                <CancelledStudentActivities
                  student={student}
                  page="assessment"
                />
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
                <h3 className="text-center mb-4">Ingen elev vald</h3>
                <button
                  className="btn btn-primary btn-block w-100 mb-2 submitBtn"
                  onClick={() => navigate("/")}
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
