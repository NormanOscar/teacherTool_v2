import '../styles.css';
import { useState } from 'react';
import studentData from '../json/studentData.json';

export default function Assessment() {
  let student = studentData.students.filter((student) => student.id === JSON.parse(localStorage.getItem("studentId")));
  const name = student[0].name;

  return (
    <>
      <div><p className="student-name">{name}</p></div>
      <div className="d-flex justify-content-center mt-5 main-div">
        <form className="mb-4" id="form-block">
          <h1 className="mb-4" style={{textAlign: 'center'}}>Bedömning</h1>

          <div className="form-outline mb-2" id="gradingTool-div">
            <label htmlFor="grading-tool">Bedömningsverktyg: <span className="required-symbol">*</span></label>
            <select className="form-select border border-2" id="gradingTool" name="gradingTool" required>
              <option value="0">Välj bedömningsverktyg</option>
            </select>
          </div>
                
          <div className="form-outline mb-2" id="area-div">
            <label htmlFor="area">Område: <span className="required-symbol">*</span></label>
            <select className="form-select border border-2" id="area" name="area" required></select>
          </div>

          <div className="form-outline mb-2" id="criteria-div">
            <label htmlFor="criteria">Kriteria: <span className="required-symbol">*</span></label>
            <select className="form-select border border-2" id="criteria" name="criteria" required></select>
          </div>

          <div id="level-div">
            <div className="form-outline mb-2" id="level-select-div">
              <label htmlFor="level">Uppnår: <span className="required-symbol">*</span></label>
              <select className="form-select border border-2" id="level" name="level"></select>
            </div>

            <div className="form-check mb-2" id="level-check-div">
              <label className="form-check-label" htmlFor="flexCheckDefault">Uppnår kriteria </label>
              <input className="form-check-input border border-2" type="checkbox" id="flexCheckDefault" />
            </div>
          </div>

          <div className="form-outline mb-2">
            <label htmlFor="comment">Kommentar:</label>
            <textarea className="form-control border border-2 form-text" rows="4" id="comment"></textarea>
          </div>

          <button className="btn btn-primary btn-block w-100 mb-2 submitBtn">Spara</button>
        </form>
      </div>
    </>
  );
};