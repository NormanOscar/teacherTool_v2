import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import Levels from "../components/Assessment/Levels";
import StudentActivities from "../components/Assessment/StudentActivities";
import CancelledStudentActivities from "../components/Assessment/CancelledStudentActivities";

import data from "../json/data.json";
import { addStudentsToLocalStorage, getCurrentDate } from "../components/func";

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
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedArea, setSelectedArea] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState(0);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  useEffect(() => {
    if (!localStorage.getItem("login")) {
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
    name = student.name + " (åk. " + student.grade + ")";
    if (student.flag) {
      if (student.flag === "ok") {
        flag.name = "Ok";
        flag.color = "green";
      } else if (student.flag === "indentify") {
        flag.name = "Indikera";
        flag.color = "yellow";
      } else if (student.flag === "danger") {
        flag.name = "Befara";
        flag.color = "red";
      }
    }
  } else {
    name = "Du måste välja en elev";
  }

  function handleForm(e) {
    e.preventDefault();

    if (selectedTool === 0) {
      setInputResult({
        msg: "Du måste välja bedömningsverktyg",
        type: "danger",
      });
      return;
    } else if (selectedArea === 0) {
      setInputResult({ msg: "Du måste välja område", type: "danger" });
      return;
    } else if (selectedCriteria === 0) {
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

      document.querySelectorAll(".gradingToolRadio-btn").forEach((radioBtn) => {
        if (radioBtn.checked) {
          anyChecked = true;
          let mergedStr = gradingToolVal.concat(" ", radioBtn.value);
          gradingToolVal = mergedStr;
        }
      });

      if (!anyChecked) {
        setInputResult({
          msg: "Du måste välja en nivå på Skolverket",
          type: "danger",
        });
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
    document.querySelector("#comment").value = "";
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
          <Row className="pt-2">
            <Col xs={12} md={2}></Col>
            <Col xs={12} md={8}>
              <Container className="text-center d-flex justify-content-center align-items-center py-2">
                <h3 className="student-name d-inline-block">{name}</h3>
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
            <Col xs={12} md={2}>
              <Container className="d-flex justify-content-center align-items-center w-100 h-100">
                <button
                  className="btn btn-primary px-5 py-3"
                  onClick={() => (window.location.href = "/analyse")}
                >
                  Analys
                </button>
              </Container>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <h4 className="mb-4" style={{ textAlign: "center" }}>
                  Pågående aktiviteter
                </h4>
                <StudentActivities student={student} page="assessment" />
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="p-4 my-2">
                <div className="d-flex justify-content-center">
                  <form className="mb-4" id="form-block" onSubmit={handleForm}>
                    <h4 className="mb-4" style={{ textAlign: "center" }}>
                      Bedömning
                    </h4>

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
                        Bedömningsverktyg:{" "}
                        <span className="required-symbol">*</span>
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
                            defaultChecked
                          />
                          <label
                            className="btn btn-light border border-secondary px-4 gradingToolRadio-label"
                            htmlFor="option1"
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
                          />
                          <label
                            className="btn btn-light border border-secondary px-4  gradingToolRadio-label"
                            htmlFor="option2"
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
                          />
                          <label
                            className="btn btn-light border border-secondary px-4  gradingToolRadio-label"
                            htmlFor="option3"
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
                                .filter((area) =>
                                  area.gradingTool.includes(selectedTool)
                                )
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
                          Kriterium: <span className="required-symbol">*</span>
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
                                  <option
                                    key={criteria.name}
                                    value={criteria.id}
                                  >
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

                    {selectedCriteria != 0 ? (
                      <Levels id={selectedCriteria} />
                    ) : null}

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
                <h4 className="mb-4" style={{ textAlign: "center" }}>
                  Avslutade aktiviteter
                </h4>
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
