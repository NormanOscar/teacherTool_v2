import { useState } from 'react';
import { Modal, Col } from 'react-bootstrap';

export default function AdminEdit({ editType, editObj, show, onClose }) {
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  function formatName() {
    if (editType === 'activity') {
      return editObj.name;
    } else if (editType === 'user') {
      return editObj.firstName + ' ' + editObj.lastName;
    } else if (editType === 'student') {
      return editObj.name + ' (åk. ' + editObj.grade + ')';
    }
  }

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {'Redigera: ' + formatName()}
          </Modal.Title>
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
            {editType === 'activity' && editObj && <EditActivity activity={editObj} setError={setInputResult} />}
            {editType === 'user' && <EditUser user={editObj} setError={setInputResult} />}
            {editType === 'student' && <EditStudent student={editObj} setError={setInputResult} />}
          </Col>
        </Modal.Body>
      </Modal>
    </>
  )
}

function EditActivity({ activity, setError }) {
  const [activityName, setActivityName] = useState(activity.name || '');
  const [description, setDescription] = useState(activity.description || '');

  const handleTextChange = (e) => {
    switch(e.target.id) {
      case 'name':
        setActivityName(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      default:
        break;
    }

    setError({ msg: null, type: null });
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (activityName === '') {
      setError({ msg: "Fyll i namn", type: "danger" });
      return;
    } else if (description === '') {
      setError({ msg: "Fyll i beskrivning", type: "danger" });
      return;
    }

    let activities = JSON.parse(localStorage.getItem("activityData"));
    let activityIndex = activities.findIndex((a) => a.id === activity.id);
    activities[activityIndex].name = activityName;
    activities[activityIndex].description = description;

    localStorage.setItem("activityData", JSON.stringify(activities));

    window.location.reload(false);
  }

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
  )
}

function EditUser({ user, error }) {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [username, setUsername] = useState(user.username || '');
  const [password, setPassword] = useState(user.password || '');

  const handleTextChange = (e) => {
    switch(e.target.id) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === '') {
      error({ msg: "Fyll i förnamn", type: "danger" });
      return;
    } else if (lastName === '') {
      error({ msg: "Fyll i efternamn", type: "danger" });
      return;
    } else if (email === '') {
      error({ msg: "Fyll i email", type: "danger" });
      return;
    } else if (username === '') {
      error({ msg: "Fyll i användarnamn", type: "danger" });
      return;
    } else if (password === '') {
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
  }

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
  )
}

function EditStudent({ student, setError }) {
  const [firstName, setFirstName] = useState(student.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(student.name.split(' ')[1] || '');
  const [email, setEmail] = useState(student.email || '');
  const [selectedGrade, setSelectedGrade] = useState(student.grade || 0);

  const handleTextChange = (e) => {
    switch(e.target.id) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      default:
        break;
    }

    setError({ msg: null, type: null });
  }

  const handleSelectChange = (e) => {
    setSelectedGrade(Number(e.target.value));
    setError({ msg: null, type: null });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName === '') {
      setError({ msg: "Fyll i förnamn", type: "danger" });
      return;
    } else if (lastName === '') {
      setError({ msg: "Fyll i efternamn", type: "danger" });
      return;
    } else if (email === '') {
      setError({ msg: "Fyll i email", type: "danger" });
      return;
    } else if (selectedGrade === 0) {
      setError({ msg: "Välj årskurs", type: "danger" });
      return;
    }

    let students = JSON.parse(localStorage.getItem("studentData"));
    let studentIndex = students.findIndex((s) => s.id === student.id);
    students[studentIndex].name = firstName + ' ' + lastName;
    students[studentIndex].email = email;
    students[studentIndex].grade = selectedGrade;

    localStorage.setItem("studentData", JSON.stringify(students));

    window.location.reload(false);
  }

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
            Spara ändringar
          </button>
        </div>
      </form>
    </>
  )
}