import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";

export default function AddActivity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  const handleTextChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      case "description":
        setDescription(e.target.value);
        setInputResult({ msg: null, type: null });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setInputResult({ msg: "Namn saknas", type: "danger" });
      return;
    } else if (description === "") {
      setInputResult({ msg: "Beskrivning saknas", type: "danger" });
      return;
    } else {
      let activities = JSON.parse(localStorage.getItem('activityData'));
  
      let sortedActivities = activities.sort((a, b) => a.id - b.id);
      let id = 0;
      if (sortedActivities.length > 0) {
        id = sortedActivities[sortedActivities.length - 1].id + 1;
      }
  
      let data = {
        id : id,
        name : name,
        description : description
      }
  
      activities.push(data);
      localStorage.setItem('activityData', JSON.stringify(activities));
      setName("");
      setDescription("");
    }

    window.location.reload(false);
  }

  return(
    <Card className="p-4 my-2">
      <Col>
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Lägg till aktivitet
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
            <label style={{ margin: 0 }} htmlFor="name">
              Namn <span className="required-symbol">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
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
            <button className="btn btn-primary" onClick={handleSubmit}>
              Lägg till
            </button>
          </div>
        </form>
      </Col>
    </Card>
  );
}