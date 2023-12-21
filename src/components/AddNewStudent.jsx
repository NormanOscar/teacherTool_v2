import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";

export default function AddNewStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("0");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  const handleSelectChange = (e) => {
    setSelectedGrade(e.target.value);
    setInputResult({ msg: null, type: null });
  };

  const handleTextChange = (e) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      case "lastName":
        setLastName(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      case "email":
        setEmail(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      setInputResult({ msg: "Förnamn saknas", type: "danger" });
      return;
    } else if (lastName === "") {
      setInputResult({ msg: "Efternamn saknas", type: "danger" });
      return;
    } else if (email === "") {
      setInputResult({ msg: "Email saknas", type: "danger" });
      return;
    } else if (selectedGrade === "0") {
      setInputResult({ msg: "Årskurs saknas", type: "danger" });
      return;
    }

    let students = JSON.parse(localStorage.getItem('studentData'));

    if (students.find(student => student.email === email)) {
      setInputResult({ msg: "Email finns redan", type: "danger" });
      return;
    }

    let sortedStudents = students.sort((a, b) => a.id - b.id);
    let id = sortedStudents[sortedStudents.length - 1].id + 1;

    let data = {
      id : id,
      name : firstName + " " + lastName,
      grade : Number(selectedGrade),
      email : email,
      assessments : [],
      activeActivities : 0,
      cancelledActivities : 0,
      activities : [],
    }

    students.push(data);
    localStorage.setItem('studentData', JSON.stringify(students));
    setInputResult({ msg: "Elev tillagd", type: "success" });
    setSelectedGrade("0");
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  return(
    <Card className="p-4 my-2">
      <h4 className="mb-4" style={{ textAlign: "center" }}>
        Lägg till elev
      </h4>
      <Col className="mt-4 ">
      <form>
        {inputResult.msg !== null && (
          <div 
          className={
            inputResult.type === "danger"
              ? "alert alert-danger"
              : "alert alert-success"
          } role="alert">
            {inputResult.msg}
          </div>
        )}
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="firstName">
            Förnamn <span className="required-symbol">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            className="form-control"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="lastName">
            Efternamn <span className="required-symbol">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            className="form-control"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="email">
            Email <span className="required-symbol">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="form-control"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="grade">
            Årskurs <span className="required-symbol">*</span>
          </label>
          <select
            className="form-select"
            type="text"
            id="grade"
            value={selectedGrade}
            onChange={handleSelectChange}>
            <option value="0">Välj årskurs</option>
            <option value="1">Årskurs 1</option>
            <option value="2">Årskurs 2</option>
            <option value="3">Årskurs 3</option>
            </select>
        </div>
        <div className="mb-2 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Lägg till
          </button>
        </div>
      </form>
      </Col>
    </Card>
  );
}