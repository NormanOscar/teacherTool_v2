import { useState } from "react";
import { Modal, Col } from "react-bootstrap";

export default function AdminEdit({ editType, editObj, show, onClose }) {
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  function formatName() {
    if (editType === "activity") {
      return editObj.name;
    } else if (editType === "user") {
      return editObj.firstName + " " + editObj.lastName;
    } else if (editType === "student") {
      return editObj.name + " (" + editObj.class + ")";
    }
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{"Redigera: " + formatName()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Col>
            {editType === "activity" && editObj && (
              <EditActivity activity={editObj} setError={setInputResult} />
            )}
            {editType === "user" && (
              <EditUser user={editObj} setError={setInputResult} />
            )}
            {editType === "student" && (
              <EditStudent student={editObj} setError={setInputResult} />
            )}
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
}

function EditActivity({ activity, setError }) {
  const [activityName, setActivityName] = useState(activity.name || "");
  const [description, setDescription] = useState(activity.description || "");

  const handleTextChange = (e) => {
    switch (e.target.id) {
      case "name":
        setActivityName(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      default:
        break;
    }

    setError({ msg: null, type: null });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (activityName === "") {
      setError({ msg: "Fyll i namn", type: "danger" });
      return;
    } else if (description === "") {
      setError({ msg: "Fyll i beskrivning", type: "danger" });
      return;
    }

    let activities = JSON.parse(localStorage.getItem("activityData"));
    let activityIndex = activities.findIndex((a) => a.id === activity.id);
    activities[activityIndex].name = activityName;
    activities[activityIndex].description = description;

    localStorage.setItem("activityData", JSON.stringify(activities));

    window.location.reload(false);
  };

  return (
    <>
      <form>
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="name">
            Namn <span className="required-symbol">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={activityName}
            className="form-control"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="description">
            Beskrivning <span className="required-symbol">*</span>
          </label>
          <textarea
            rows="5"
            id="description"
            value={description}
            className="form-control"
            style={{ resize: "none" }}
            onChange={handleTextChange}
          />
        </div>
        <div className="mb-2 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleSave}>
            Spara ändringar
          </button>
        </div>
      </form>
    </>
  );
}

function EditUser({ user, error }) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState(user.password || "");

  const handleTextChange = (e) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      error({ msg: "Fyll i förnamn", type: "danger" });
      return;
    } else if (lastName === "") {
      error({ msg: "Fyll i efternamn", type: "danger" });
      return;
    } else if (email === "") {
      error({ msg: "Fyll i email", type: "danger" });
      return;
    } else if (username === "") {
      error({ msg: "Fyll i användarnamn", type: "danger" });
      return;
    } else if (password === "") {
      error({ msg: "Fyll i lösenord", type: "danger" });
      return;
    }

    let users = JSON.parse(localStorage.getItem("userData"));
    let userIndex = users.findIndex((u) => u.id === user.id);
    users[userIndex].firstName = firstName;
    users[userIndex].lastName = lastName;
    users[userIndex].email = email;
    users[userIndex].username = username;
    users[userIndex].password = password;

    localStorage.setItem("userData", JSON.stringify(users));

    window.location.reload(false);
  };

  return (
    <>
      <form>
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
          <label style={{ margin: 0 }} htmlFor="username">
            Användarnamn <span className="required-symbol">*</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            className="form-control"
            onChange={handleTextChange}
          />
        </div>
        <div className="form-outline mb-2">
          <label style={{ margin: 0 }} htmlFor="password">
            Lösenord <span className="required-symbol">*</span>
          </label>
          <input
            type="text"
            id="password"
            value={password}
            className="form-control"
            onChange={handleTextChange}
          />
        </div>
        <div className="mb-2 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Lägg till
          </button>
        </div>
      </form>
    </>
  );
}

function EditStudent({ student, setError }) {
  const [firstName, setFirstName] = useState(student.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(student.name.split(" ")[1] || "");
  const [email, setEmail] = useState(student.email || "");
  const [gender, setGender] = useState(student.gender || "b");
  const [selectedClass, setSelectedClass] = useState(student.class || "0");
  const [selectedSubject, setSelectedSubject] = useState(
    Number(student.subject) || "0"
  );
  const [arrivalYear, setArrivalYear] = useState(student.arrivalYear || "");
  const [birthYear, setBirthYear] = useState(student.birthYear || "");
  const [bornInSweden, setBornInSweden] = useState(student.bornInSweden);

  const handleTextChange = (e) => {
    switch (e.target.id) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;
    }

    setError({ msg: null, type: null });
  };

  const handleSelectChange = (e) => {
    setError({ msg: null, type: null });

    switch (e.target.id) {
      case "class":
        setSelectedClass(e.target.value);
        break;
      case "subject":
        setSelectedSubject(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === "") {
      setError({ msg: "Fyll i förnamn", type: "danger" });
      return;
    } else if (lastName === "") {
      setError({ msg: "Fyll i efternamn", type: "danger" });
      return;
    } else if (email === "") {
      setError({ msg: "Fyll i email", type: "danger" });
      return;
    } else if (selectedClass === "0") {
      setError({ msg: "Välj klass", type: "danger" });
      return;
    } else if (selectedSubject === "0") {
      setError({ msg: "Välj ämne", type: "danger" });
      return;
    } else if (birthYear === "") {
      setError({ msg: "Fyll i födelseår", type: "danger" });
      return;
    } else if (!bornInSweden && arrivalYear === "") {
      setError({ msg: "Fyll i ankomstår", type: "danger" });
      return;
    }

    let students = JSON.parse(localStorage.getItem("studentData"));
    let studentIndex = students.findIndex((s) => s.id === student.id);
    students[studentIndex].name = firstName.trim() + " " + lastName.trim();
    students[studentIndex].gender = gender;
    students[studentIndex].birthYear = birthYear;
    students[studentIndex].email = email;
    students[studentIndex].class = selectedClass;
    students[studentIndex].subject = selectedSubject;
    if (!bornInSweden) {
      students[studentIndex].arrivalYear = arrivalYear;
    } else {
      students[studentIndex].arrivalYear = "";
    }
    students[studentIndex].bornInSweden = bornInSweden;
    localStorage.setItem(
      "studentData",
      JSON.stringify(students)
    );

    window.location.reload(false);
  };

  return (
    <>
      <form>
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
          <label style={{ margin: 0 }} htmlFor="birthYear">
            Födelseår <span className="required-symbol">*</span>
          </label>
          <input
            type="number"
            step="1"
            id="birthYear"
            className="form-control"
            onChange={(e) => setBirthYear(e.target.value)}
            value={birthYear}
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
          <div className="form-switch d-flex p-0">
            <input
              className="form-check-input mx-2"
              type="checkbox"
              id="bornInSweden"
              onChange={(e) => setBornInSweden(e.target.checked)}
              checked={bornInSweden}
            />
            <label className="form-check-label" htmlFor="bornInSweden">
              Född i Sverige
            </label>
          </div>
        </div>
        {!bornInSweden && (
          <div className="form-outline mb-2">
            <label style={{ margin: 0 }} htmlFor="arrivalYear">
              Ankomstår <span className="required-symbol">*</span>
            </label>
            <input
              type="number"
              min="1900"
              max="2099"
              step="1"
              id="arrivalYear"
              className="form-control"
              onChange={(e) => setArrivalYear(e.target.value)}
              value={arrivalYear}
            />
          </div>
        )}
        <div className="mb-2 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Spara ändringar
          </button>
        </div>
      </form>
    </>
  );
}
