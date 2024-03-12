import { useState, useEffect } from "react";
import { getCurrentDate } from "./func";
import Levels from "../components/Student/Levels";

import data from "../json/data.json";

function studentInLocalStorage(studentId) {
  let savedData = JSON.parse(localStorage.getItem("studentData"));
  if (savedData !== null) {
    return savedData.find((dataPoint) => dataPoint.id === studentId)
      ? true
      : false;
  }
}

function saveLocalStorage(data) {
  if (studentInLocalStorage(data.id)) {
    const logedInUserId = JSON.parse(localStorage.getItem("userId"));
    let savedData = JSON.parse(localStorage.getItem("studentData"));
    let student = savedData.filter((student) => student.id === data.id)[0];
    let dataToSave = {
      date: getCurrentDate(),
      gradingTool: data.gradingTools,
      area: data.areas,
      criteria: data.criteria,
      level: data.level,
      comment: data.comment,
      teacher: logedInUserId,
    };

    let sortedAssessments = student.assessments.sort((a, b) => a.id - b.id);
    let id = 0;
    if (sortedAssessments.length > 0) {
      id = sortedAssessments[sortedAssessments.length - 1].id + 1;
    }
    dataToSave.id = id;
    student.assessments.push(dataToSave);
    localStorage.setItem("studentData", JSON.stringify(savedData));
  }
}

export default function AssessmentForm({ student, currentAssessment }) {
  console.log(currentAssessment);
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedArea, setSelectedArea] = useState(0);
  const [selectedCriteria, setSelectedCriteria] = useState(0);
  const [skolverketLevel, setSkolverketLevel] = useState("A");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  useEffect(() => {
    if (currentAssessment) {
      setSelectedTool(
        data.gradingTools.find(
          (tool) => tool.name === currentAssessment.gradingTool.split(" ")[0]
        ).id
      );
      if (currentAssessment.gradingTool.split(" ").length > 1) {
        setSkolverketLevel(currentAssessment.gradingTool.split(" ")[1]);
      }
      setSelectedArea(
        data.areas.find((area) => area.name === currentAssessment.area).id
      );
      setSelectedCriteria(
        data.criteria.find(
          (criteria) => criteria.name === currentAssessment.criteria
        ).id
      );
    }
  }, []);
  console.table({ selectedTool, selectedArea, selectedCriteria });

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
    const wordCount = document.querySelector("#wordCount");

    var levelVal;
    if (levelSelect != null) {
      if (levelSelect.value == 0) {
        setInputResult({ msg: "Du måste välja en nivå", type: "danger" });
        return;
      }
      levelVal = levelSelect.value;
    } else if (levelCheck != null) {
      levelVal = levelCheck.checked ? "Uppnår" : "Uppnår inte";
    } else {
      if (wordCount.value == 0) {
        setInputResult({
          msg: "Du måste välja fylla i antal ord",
          type: "danger",
        });
        return;
      }
      levelVal = wordCount.value;
    }
    const nameVal = student.name;
    const classVal = student.class;
    let gradingToolVal = data.gradingTools.find(
      (tool) => tool.id === selectedTool
    ).name;

    if (selectedTool === 1) {
      let mergedStr = gradingToolVal.concat(" ", skolverketLevel);
      gradingToolVal = mergedStr;
      
    }
    const areaVal = data.areas.find((area) => area.id === selectedArea).name;
    const criteriaVal = data.criteria.find(
      (criteria) => criteria.id === selectedCriteria
    ).name;
    const commentVal = document.querySelector("#comment").value;

    if (currentAssessment) {
      let storedData = JSON.parse(localStorage.getItem("studentData"));
      let student = storedData.find((student) => student.id === JSON.parse(localStorage.getItem("studentId")));
      let assessmentToUpdate = student.assessments.find((assessment) => assessment.id === currentAssessment.id);
      assessmentToUpdate.gradingTool = gradingToolVal;
      assessmentToUpdate.area = areaVal;
      assessmentToUpdate.criteria = criteriaVal;
      assessmentToUpdate.level = levelVal;
      assessmentToUpdate.comment = commentVal;
      localStorage.setItem("studentData", JSON.stringify(storedData));
      handleFormSubmit('update');
      window.location.reload(false);
      return;
    }

    const studentData = {
      name: nameVal,
      id: student.id,
      class: classVal,
      gradingTools: gradingToolVal,
      areas: areaVal,
      criteria: criteriaVal,
      level: levelVal,
      comment: commentVal,
    };

    saveLocalStorage(studentData);
    handleFormSubmit('save');
  }

  function handleFormSubmit(type) {
    setSelectedTool(0);
    setSelectedArea(0);
    setSelectedCriteria(0);
    if (type === 'update') {
      setInputResult({ msg: "Bedömning uppdaterad!", type: "success" });
    } else {
      setInputResult({ msg: "Bedömning sparad!", type: "success" });
    }
    document.querySelector("#comment").value = "";
  }

  function handleSelectChange(e) {
    switch (e.target.id) {
      case "gradingTool":
        setSelectedTool(parseInt(e.target.value));
        setSelectedArea(0);
        setSelectedCriteria(0);
        break;
      case "area":
        setSelectedArea(parseInt(e.target.value));
        setSelectedCriteria(0);
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
      <div className="d-flex justify-content-center">
        <form className="mb-4" id="form-block" onSubmit={handleForm}>
          {!currentAssessment && (
            <h4 className="mb-4" style={{ textAlign: "center" }}>
              Bedömning
            </h4>
          )}

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
                  checked={skolverketLevel === "A"}
                  onChange={(e) => setSkolverketLevel(e.target.value)}
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
                  checked={skolverketLevel === "B"}
                  onChange={(e) => setSkolverketLevel(e.target.value)}
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
                  checked={skolverketLevel === "C"}
                  onChange={(e) => setSkolverketLevel(e.target.value)}
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
    </>
  );
}
