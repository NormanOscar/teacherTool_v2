import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";

export default function AddUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

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
      case "username":
        setUsername(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      case "password":
        setPassword(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      case "confirmationPassword":
        setConfirmationPassword(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      default:
        break;
    }
  }

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
    } else if (username === "") {
      setInputResult({ msg: "Användarnamn saknas", type: "danger" });
      return;
    } else if (password === "") {
      setInputResult({ msg: "Lösenord saknas", type: "danger" });
      return;
    } else if (confirmationPassword === "") {
      setInputResult({ msg: "Bekräfta lösenord saknas", type: "danger" });
      return;
    } else if (password !== confirmationPassword) {
      setInputResult({ msg: "Lösenorden matchar inte", type: "danger" });
      return;
    } else {
      let users = JSON.parse(localStorage.getItem("userData"));
      let sortedUsers = users.sort((a, b) => a.id - b.id);
      let id = sortedUsers[sortedUsers.length - 1].id + 1;
      let data = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      };
      users.push(data);
      localStorage.setItem("userData", JSON.stringify(users));
      setFirstName("");
      setLastName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmationPassword("");
    }

    window.location.reload(false);
  }

  return(
    <Card className="p-4 my-2">
      <Col>
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Lägg till användare
        </h4>
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
          <div className="form-outline mb-2">
            <label style={{ margin: 0 }} htmlFor="confirmationPassword">
              Godkänn lösenord <span className="required-symbol">*</span>
            </label>
            <input
              type="text"
              id="confirmationPassword"
              value={confirmationPassword}
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
      </Col>
    </Card>
  )
}