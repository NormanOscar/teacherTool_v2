import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { saveUpdatedUser } from "../func";

export default function EditCard({ field }) {
  const [inputValue, setInputValue] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  const handleTextChange = (e) => {
    switch (e.target.id) {
      case "inputValue":
        setInputValue(e.target.value);
        break;
      case "oldPassword":
        setOldPassword(e.target.value);
        break;
      case "newPassword":
        setNewPassword(e.target.value);
        break;
      case "confirmationPassword":
        setConfirmationPassword(e.target.value);
        break;
      default:
        break;
    }
    setInputResult({ msg: null, type: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (field !== "Lösenord" && inputValue === "") {
      setInputResult({ msg: `${field} saknas`, type: "danger" });
      return;
    } else if (field === "Lösenord") {
      if (oldPassword === "") {
        setInputResult({ msg: "Gammalt lösenord saknas", type: "danger" });
        return;
      } else if (newPassword === "") {
        setInputResult({ msg: "Nytt lösenord saknas", type: "danger" });
        return;
      } else if (confirmationPassword === "") {
        setInputResult({ msg: "Bekräfta lösenord saknas", type: "danger" });
        return;
      } else if (newPassword !== confirmationPassword) {
        setInputResult({ msg: "Lösenorden matchar inte", type: "danger" });
        return;
      } else if (
        oldPassword !== JSON.parse(localStorage.getItem("userData")).password
      ) {
        setInputResult({ msg: "Fel gammalt lösenord", type: "danger" });
        return;
      } else if (
        newPassword === JSON.parse(localStorage.getItem("userData")).password
      ) {
        setInputResult({
          msg: "Nya lösenordet måste vara annorlunda",
          type: "danger",
        });
        return;
      } else {
        saveUpdatedUser(field, newPassword);
      }
    } else {
      saveUpdatedUser(field, inputValue);
    }
  };

  return (
    <Card className="p-4 my-2">
      <h4 className="mb-4" style={{ textAlign: "center" }}>
        Byt {field}
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
        {field === "Lösenord" ? (
          <>
            <div className="form-outline mb-2">
              <label style={{ margin: 0 }} htmlFor="oldPassword">
                Gammalt lösenord <span className="required-symbol">*</span>
              </label>
              <input
                type="text"
                id="oldPassword"
                value={oldPassword}
                className="form-control"
                onChange={handleTextChange}
              />
            </div>
            <div className="form-outline mb-2">
              <label style={{ margin: 0 }} htmlFor="newPassword">
                Nytt lösenord <span className="required-symbol">*</span>
              </label>
              <input
                type="text"
                id="newPassword"
                value={newPassword}
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
          </>
        ) : (
          <div className="form-outline mb-2">
            <label style={{ margin: 0 }} htmlFor="inputValue">
              {field} <span className="required-symbol">*</span>
            </label>
            <input
              type="text"
              id="inputValue"
              value={inputValue}
              className="form-control"
              onChange={handleTextChange}
            />
          </div>
        )}
        <div className="mb-2 d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Spara
          </button>
        </div>
      </form>
    </Card>
  );
}
