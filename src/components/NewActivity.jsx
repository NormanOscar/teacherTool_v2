import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getCurrentDate } from "./func";
import { activities } from "../json/activities.json";

export default function NewActivity({ selectedStudent, page }) {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("0");
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  useEffect(() => {
    setSelectedDate(getCurrentDate()); // Set the default value to today's date
  }, []);

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setInputResult({ msg: null, type: null });
  }

  function handleActivityChange(e) {
    setSelectedActivity(e.target.value);
    setInputResult({ msg: null, type: null });
  }

  function handleSave() {
    if (selectedDate === "") {
      setInputResult({ msg: "Du måste välja ett datum", type: "danger" });
      return;
    } else if (selectedActivity === "0") {
      setInputResult({ msg: "Du måste välja en aktivitet", type: "danger" });
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('studentData'));
    const currentStudent = storedData.find((student) => student.id == selectedStudent.id);
    const sortedActivities = currentStudent.activities.sort((a, b) => a.id - b.id);

    const data = {
      cancelComment: "",
      cancelDate: "",
      cancelled: false,
      date: selectedDate,
      id: sortedActivities.length > 0 ? (parseInt(sortedActivities[sortedActivities.length - 1].id) + 1) : 1,
      name: activities.find((activity) => activity.id == selectedActivity).name,
      updates: [],
    }

    currentStudent.activeActivities++;
    currentStudent.activities.push(data);
    localStorage.setItem('studentData', JSON.stringify(storedData));
    window.location.reload(false);
  }

  return (
    <>
      {show && (
        <Modal dialogClassName="confirmationModal" show={show} onHide={hideModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Ny aktivetet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="text-center">{selectedStudent.name}</h4>
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
            <Col
              className="border-0 rounded-1" style={{
                padding: "1em",
                margin: "1em 0 1em 0",
                backgroundColor: "#ededed",
            }}>
              <Row className="my-3">
                <div className="md-form">
                  <label htmlFor="defaultForm-date">
                    Start: <span className="required-symbol">*</span>
                  </label>
                  <input
                    type="date"
                    value = {selectedDate}
                    onChange={handleDateChange}
                    id="defaultForm-date"
                    className="form-control validate"
                  />
                </div>
              </Row>
              <Row className="mt-3">
                <div className="md-form">
                  <label htmlFor="defaultForm-Activity">
                    Aktivitet: <span className="required-symbol">*</span>
                  </label>
                  <select
                    id="defaultForm-Activity"
                    className="form-select border border-2"
                    value={selectedActivity}
                    onChange={handleActivityChange}
                  >
                    <option value="0">Välj en aktivetet</option>
                    {activities.map((activity, index) => {
                      return (
                        <option key={index} value={activity.id}>
                          {activity.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Row>
              {selectedActivity !== "0" ? (
                <Row className="my-3">
                  <p className="mb-0">Beskrivning:</p>
                  <p className="mb-0 px-4 text-muted">{activities.find((activity) => activity.id == selectedActivity).description}</p>
                </Row>
              ) : null}
            </Col>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary" onClick={handleSave}>Starta</button>
            <button type="button" className="btn btn-danger" onClick={hideModal}>Avbryt</button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="d-flex d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary btn-md my-3"
          onClick={showModal}
        >
          Starta ny aktivitet
        </button>
      </div>
    </>
  );
}