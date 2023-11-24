import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ConfirmationModal from "./ConfirmationModal";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import { getCurrentDate } from "./func";

library.add(faFaceSmile, faFaceMeh, faFaceFrown);

export default function ActivityModal({
  show,
  activity,
  student,
  onClose,
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [performance, setPerformance] = useState("good");
  const [inputResult, setInputResult] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const showConfirmationModal = () => setShowConfirmation(true);
  const hideConfirmationModal = () => setShowConfirmation(false);

  useEffect(() => {
    setSelectedDate(getCurrentDate()); // Set the default value to today's date
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setInputResult(false);
  };

  const handlePresent = () => {
    setIsPresent(!isPresent);
    setInputResult(false);
  };

  const handlePerformance = (e) => {
    setPerformance(e.target.id);
    setInputResult(false);
  };

  const handleSave = () => {
    let data = {
      student: student.id,
      activity: activity.id,
      date: document.querySelector("#defaultForm-date").value,
      present: isPresent,
    };
    if (isPresent) {
      data.performance = performance;
      data.comment = document.querySelector("#comment").value;
    } else {
      data.comment = document.querySelector("#absentComment").value;
    }
    if (selectedDate === "") {
      setInputResult(true);
      return;
    } else {
      // TODO: Send data to backend
      onClose();
    }
  };

  function hideModal() {
    setIsPresent(true);
    onClose();
  }

  function hideConfirmation() {
    setShowConfirmation(false);
    hideModal();
  }

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal
          show={showConfirmation}
          closeModal={hideConfirmationModal}
          onDeny={hideConfirmation}
        />
      )}
      <Modal show={show} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <div className="col">
            <div className="row">
              <Modal.Title>
                {activity.name}{" "}
                <small style={{ color: "grey" }}>{activity.date}</small>
              </Modal.Title>
            </div>
            <div className="row">
              <p>{student.name + " (åk. " + student.grade + ")"}</p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex-column align-items-center" key={student.id}>
            <div className="row mb-3">
              <div className="container">
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  onClick={showConfirmationModal}
                >
                  Avsluta aktivitet
                </button>
              </div>
            </div>

            {inputResult ? (
              <div className="alert alert-danger" role="alert">
                Du måste välja ett datum!
              </div>
            ) : null}
            <div className="row my-3">
              <div className="md-form">
                <label htmlFor="defaultForm-date">
                  Datum: <span className="required-symbol">*</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  id="defaultForm-date"
                  className="form-control validate"
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
              <div className="btn-group">
                <input
                  type="radio"
                  className="btn-check"
                  name="presence-options"
                  id="present"
                  autoComplete="off"
                  defaultChecked
                  onChange={handlePresent}
                />
                <label className="btn" htmlFor="present">
                  Närvarande
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="presence-options"
                  id="absent"
                  autoComplete="off"
                  onChange={handlePresent}
                />
                <label className="btn" htmlFor="absent">
                  Frånvarande
                </label>
              </div>
            </div>
            {isPresent ? (
              <div
                className="col border-0 rounded-1"
                style={{
                  padding: "1em 1em 0.5em 1em",
                  backgroundColor: "#ededed",
                }}
              >
                <div className="row">
                  <div className="col">
                    <div className="row">
                      <p style={{ marginBottom: "4px" }}>Hur gick det?</p>
                    </div>
                    <div className="row">
                      <div className="btn-group">
                        <input
                          type="radio"
                          className="btn-check performance-btn"
                          name="performance-options"
                          id="good"
                          autoComplete="off"
                          defaultChecked
                          onChange={handlePerformance}
                        />
                        <label
                          className="btn performance-label"
                          htmlFor="good"
                          style={{ backgroundColor: "#20b26b" }}
                        >
                          <FontAwesomeIcon
                            icon={faFaceSmile}
                            size="2xl"
                            color="black"
                          />
                        </label>

                        <input
                          type="radio"
                          className="btn-check performance-btn"
                          name="performance-options"
                          id="neutral"
                          autoComplete="off"
                          onChange={handlePerformance}
                        />
                        <label
                          className="btn performance-label"
                          htmlFor="neutral"
                          style={{ backgroundColor: "#ffe207" }}
                        >
                          <FontAwesomeIcon
                            icon={faFaceMeh}
                            size="2xl"
                            color="black"
                          />
                        </label>
                        <input
                          type="radio"
                          className="btn-check performance-btn"
                          name="performance-options"
                          id="bad"
                          autoComplete="off"
                          onChange={handlePerformance}
                        />
                        <label
                          className="btn performance-label"
                          htmlFor="bad"
                          style={{ backgroundColor: "#ff3d4d" }}
                        >
                          <FontAwesomeIcon
                            icon={faFaceFrown}
                            size="2xl"
                            color="black"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="form-outline">
                    <label htmlFor="comment">Kommentar:</label>
                    <textarea
                      className="form-control border border-2 form-text"
                      rows="4"
                      id="comment"
                      style={{ resize: "none" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="col border-0 rounded-1"
                style={{
                  padding: "1em 1em 0.5em 1em",
                  backgroundColor: "#ededed",
                }}
              >
                <div className="row mb-3">
                  <div className="form-outline">
                    <label htmlFor="absentComment">Kommentar:</label>
                    <textarea
                      className="form-control border border-2 form-text"
                      rows="4"
                      id="absentComment"
                      style={{ resize: "none" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="row mt-3">
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Spara
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
