import "../styles.css";
import { useState } from "react";
import Levels from "../components/Levels";
import studentData from "../json/studentData.json";
import data from "../json/data.json";

export default function Intervention() {
  const [selectedTool, setSelectedTool] = useState("0");
  const [selectedArea, setSelectedArea] = useState("0");
  const [selectedCriteria, setSelectedCriteria] = useState("0");

  let student = studentData.students.filter(
    (student) => student.id === JSON.parse(localStorage.getItem("studentId"))
  );
  const name = student[0].name;

  function handleForm() {
    const nameVal = student[0].name;
    const gradeVal = student[0].grade;
    const gradingToolVal = data.gradingTools.find((tool) => tool.id == selectedTool).name;
    const areaVal = data.areas.find((area) => area.id == selectedArea).name;
    const criteriaVal = data.criteria.find((criteria) => criteria.id == selectedCriteria).name;
    const levelCheck = document.querySelector('#flexCheckDefault');
    const levelSelect = document.querySelector('#level');

    var levelVal;
    if (levelCheck == null) {
        levelVal = levelSelect.value;
    } else {
        levelVal = levelCheck.checked ? 'Uppnår' : 'Uppnår inte';
    }
    const commentVal = document.querySelector('#comment').value;

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
}

function saveLocalStorage(data) {
    let savedData = localStorage.getItem('studentData');
    if (savedData === null) {
        let studentDataList = [data];
        localStorage.setItem('studentData', JSON.stringify(studentDataList));
    }
    else {
        let studentDataList = JSON.parse(savedData);
        studentDataList.push(data);
        localStorage.setItem('studentData', JSON.stringify(studentDataList));
    }
}

  return (
    <>
      <div>
        <p className="student-name">{name}</p>
      </div>
      <div className="d-flex justify-content-center mt-5 main-div">
        <form className="mb-4" id="form-block">
          <h1 className="mb-4" style={{ textAlign: "center" }}>
            Intervention
          </h1>

          <div className="form-outline mb-2" id="gradingTool-div">
            <label htmlFor="grading-tool">
              Bedömningsverktyg: <span className="required-symbol">*</span>
            </label>
            <select
              className="form-select border border-2"
              id="gradingTool"
              name="gradingTool"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
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

          <div className="form-outline mb-2" id="area-div">
            <label htmlFor="area">
              Område: <span className="required-symbol">*</span>
            </label>
            <select
              className="form-select border border-2"
              id="area"
              name="area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              required
            >
              <option value="0">Välj område</option>
              {selectedTool != "0"
                ? data.areas
                    .filter((area) =>
                      area.gradingTool.includes(parseInt(selectedTool))
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

          <div className="form-outline mb-2" id="criteria-div">
            <label htmlFor="criteria">
              Kriteria: <span className="required-symbol">*</span>
            </label>
            <select
              className="form-select border border-2"
              id="criteria"
              name="criteria"
              value={selectedCriteria}
              onChange={(e) => setSelectedCriteria(e.target.value)}
              required
            >
              <option value="0">Välj kriteria</option>
              {selectedArea != "0"
                ? data.criteria
                    .filter(
                      (criteria) =>
                        criteria.area.includes(parseInt(selectedArea)) &&
                        criteria.area.includes(parseInt(selectedTool))
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
                  
          {
            selectedCriteria != "0" ? (
              <Levels id={selectedCriteria}/>
            ) : null
          }
          
          <div className="form-outline mb-2">
            <label htmlFor="comment">Kommentar:</label>
            <textarea
              className="form-control border border-2 form-text"
              rows="4"
              id="comment"
            ></textarea>
          </div>

          <button className="btn btn-primary btn-block w-100 mb-2 submitBtn" onClick={handleForm}>
            Spara
          </button>
        </form>
      </div>
    </>
  );
}
