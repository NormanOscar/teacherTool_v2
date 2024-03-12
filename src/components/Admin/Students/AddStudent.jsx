import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("b");
  const [email, setEmail] = useState("");
  const [selectedClass, setSelectedClass] = useState("0");
  const [selectedSubject, setSelectedSubject] = useState("0");
  const [year, setYear] = useState("2000");
  const [bornInSweden, setBornInSweden] = useState(true);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  const handleSelectChange = (e) => {
    setInputResult({ msg: null, type: null });
    switch (e.target.id) {
      case "class":
        setSelectedClass(e.target.value);
        break;
      case "subject":
        setSelectedSubject(e.target.value);
        break;
    }
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
    } else if (selectedClass === "0") {
      setInputResult({ msg: "Klass saknas", type: "danger" });
      return;
    } else if (selectedSubject === "0") {
      setInputResult({ msg: "Ämne saknas", type: "danger" });
      return;
    } else if (year === "") {
      setInputResult({ msg: "År saknas", type: "danger" });
      return;
    } else {
      let students = JSON.parse(localStorage.getItem("studentData"));

      if (students.find((student) => student.email === email)) {
        setInputResult({ msg: "Email finns redan", type: "danger" });
        return;
      }

      let sortedStudents = students.sort((a, b) => a.id - b.id);
      let id = 0;
      if (sortedStudents.length > 0) {
        id = sortedStudents[sortedStudents.length - 1].id + 1;
      }

      let data = {
        id: id,
        name: firstName.trim() + " " + lastName.trim(),
        gender: gender,
        email: email.trim(),
        class: selectedClass,
        subject: selectedSubject,
        year: year,
        bornInSweden: bornInSweden,
        assessments: [],
        activeActivities: 0,
        cancelledActivities: 0,
        activities: [],
      };

      students.push(data);
      localStorage.setItem("studentData", JSON.stringify(students));
      setInputResult({ msg: "Elev tillagd", type: "success" });
      setSelectedClass("0");
      setFirstName("");
      setLastName("");
      setEmail("");
    }

    window.location.reload(false);
  };

  return (
    <Card className="p-4 my-2">
      <Col>
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Lägg till elev
        </h4>
        <form>
          {inputResult.msg !== null && (
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
            <label style={{ margin: 0 }} htmlFor="gender">
              Kön <span className="required-symbol">*</span>
            </label>
            <div className="d-flex">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="boyBtn"
                  value="b"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "b"}
                />
                <label className="form-check-label" htmlFor="boyBtn">
                  Kille
                </label>
              </div>
              <div className="form-check mx-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="girlBtn"
                  value="g"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "g"}
                />
                <label className="form-check-label" htmlFor="girlBtn">
                  Tjej
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="other"
                  value="o"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "o"}
                />
                <label className="form-check-label" htmlFor="other">
                  Annat
                </label>
              </div>
            </div>
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
            <label style={{ margin: 0 }} htmlFor="class">
              Klass <span className="required-symbol">*</span>
            </label>
            <select
              className="form-select"
              type="text"
              id="class"
              value={selectedClass}
              onChange={handleSelectChange}
            >
              <option value="0">Välj klass</option>
              <option value="1a">Klass 1a</option>
              <option value="1b">Klass 1b</option>
              <option value="2a">Klass 2a</option>
              <option value="2b">Klass 2b</option>
              <option value="3a">Klass 3a</option>
              <option value="3b">Klass 3b</option>
            </select>
          </div>
          <div className="form-outline mb-2">
            <label style={{ margin: 0 }} htmlFor="subject">
              Ämne <span className="required-symbol">*</span>
            </label>
            <select
              className="form-select"
              type="text"
              id="subject"
              value={selectedSubject}
              onChange={handleSelectChange}
            >
              <option value="0">Välj ämne</option>
              <option value="1">Svenska</option>
              <option value="2">Svenska som andraspråk</option>
            </select>
          </div>
          <div className="form-outline mb-2">
            <label style={{ margin: 0 }} htmlFor="year">
              Ankomstår <span className="required-symbol">*</span>
            </label>
            <input
              type="number"
              step="1"
              id="year"
              className="form-control"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            />
          </div>
          <div className="form-outline mb-2">
            <div className="form-switch d-flex p-0">
              <input className="form-check-input mx-2" type="checkbox" id="bornInSweden" onChange={(e) => setBornInSweden(e.target.checked)} checked={bornInSweden} />
              <label className="form-check-label" htmlFor="bornInSweden">Född i Sverige</label>
            </div>
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
