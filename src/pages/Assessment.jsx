import "../styles.css";
import { useState } from "react";
import Levels from "../components/Levels";
import studentData from "../json/studentData.json";
import data from "../json/data.json";

function saveLocalStorage(data) {
  let savedData = localStorage.getItem("studentData");
  if (savedData === null) {
    let studentDataList = [data];
    localStorage.setItem("studentData", JSON.stringify(studentDataList));
  } else {
    let studentDataList = JSON.parse(savedData);
    studentDataList.push(data);
    localStorage.setItem("studentData", JSON.stringify(studentDataList));
  }
}

export default function Assessment() {
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedArea, setSelectedArea] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState(0);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  let name = "";
  let student = "";

  if (localStorage.getItem("studentId") !== null) {
    student = studentData.students.filter(
      (student) => student.id === JSON.parse(localStorage.getItem("studentId"))
    );
    name = student[0].name + " (åk. " + student[0].grade + ")";
  } else {
    name = "Du måste välja en elev";
  }

  function handleForm(e) {
    e.preventDefault();

    if (
      selectedTool === 0 ||
      selectedArea === 0 ||
      selectedCriteria === 0 ||
      student === ""
    ) {
      setInputResult({ msg: "Du måste fylla i alla fält", type: "danger" });
      return;
    }
    const levelCheck = document.querySelector("#flexCheckDefault");
    const levelSelect = document.querySelector("#level");

    var levelVal;
    if (levelSelect != null) {
      if (levelSelect.value == 0) {
        setInputResult({ msg: "Du måste fylla i alla fält", type: "danger" });
        return;
      }
      levelVal = levelSelect.value;
    } else {
      levelVal = levelCheck.checked ? "Uppnår" : "Uppnår inte";
    }
    const nameVal = student[0].name;
    const gradeVal = student[0].grade;
    let gradingToolVal = data.gradingTools.find(
      (tool) => tool.id === selectedTool
    ).name;

    if (selectedTool === 1) {
      document.querySelectorAll(".gradingToolRadio").forEach((radioBtn) => {
        if (radioBtn.checked) {
          let mergedStr = gradingToolVal.concat(" ", radioBtn.value);
          gradingToolVal = mergedStr;
        }
      });
    }
    const areaVal = data.areas.find((area) => area.id === selectedArea).name;
    const criteriaVal = data.criteria.find(
      (criteria) => criteria.id === selectedCriteria
    ).name;
    const commentVal = document.querySelector("#comment").value;

    const studentData = {
      name: nameVal,
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
      <h4 className="student-name">{name}</h4>
        <div className="d-flex justify-content-center">
          <form className="mb-4" id="form-block" onSubmit={handleForm}>
              <h1 className="mb-4" style={{ textAlign: "center" }}>
                Bedömning
              </h1>

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
                      className="btn-check gradingToolRadio"
                      name="options"
                      id="option1"
                      value="A"
                      defaultChecked
                    />
                    <label
                      className="btn btn-light border border-secondary px-4"
                      htmlFor="option1"
                    >
                      A
                    </label>
                  </div>
                  <div className="mx-1">
                    <input
                      type="radio"
                      className="btn-check gradingToolRadio"
                      name="options"
                      id="option2"
                      value="B"
                    />
                    <label
                      className="btn btn-light border border-secondary px-4"
                      htmlFor="option2"
                    >
                      B
                    </label>
                  </div>
                  <div className="mx-1">
                    <input
                      type="radio"
                      className="btn-check gradingToolRadio"
                      name="options"
                      id="option3"
                      value="C"
                    />
                    <label
                      className="btn btn-light border border-secondary px-4"
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
                    <option value="0">Välj kriteria</option>
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
          <div className="pb-5">
            <h3 className="mb-4" style={{ textAlign: "center" }}>
              Pågående interventioner
            </h3>
            {student[0].interventions.length !== 0 ? (
              <div className="d-flex justify-content-center">
                <ul className="list-group" id="current-interventions">
                  {student[0].interventions.map((intervention) => (
                    <li
                      className="list-group-item flex-column align-items-center"
                      key={intervention.id}
                    >
                      <div className="d-flex w-150 justify-content-between">
                        <h5 className="mb-1">{intervention.name}</h5>
                        <small>{intervention.date}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-center">Inga pågående interventioner</p>
            )}
          </div>
        </>
  );
}
