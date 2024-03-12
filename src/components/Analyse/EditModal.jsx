import { useState } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import AssessmentForm from "../AssessmentForm";

library.add(faFaceSmile, faFaceMeh, faFaceFrown);

export default function EditModal({
  show,
  onClose,
  obj,
  activityId,
  type,
  student,
}) {
  const getType = () => {
    switch (type) {
      case "assessment":
        return "bedömning";
      case "activityUpdate":
        return "avstämning";
      default:
        return "";
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Redigera {getType()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === "assessment" && (
          <EditAssessment
            assessment={obj}
            activityId={activityId}
            student={student}
          />
        )}
        {type === "activityUpdate" && (
          <EditActivityUpdate update={obj} activityId={activityId} />
        )}
      </Modal.Body>
    </Modal>
  );
}

function EditAssessment({ assessment, student }) {
  return (
    <>
      <AssessmentForm student={student} currentAssessment={assessment} />
    </>
  );
}

function EditActivityUpdate({ update, activityId }) {
  const [performance, setPerformance] = useState(update.performance || "good");
  const [selectedDate, setSelectedDate] = useState(update.date || "");
  const [comment, setComment] = useState(update.comment);
  const [absentComment, setAbsentComment] = useState(update.absentComment);
  const [isPresent, setIsPresent] = useState(update.present);
  const [inputResult, setInputResult] = useState({ msg: null, type: null });

  const handlePerformance = (e) => {
    setPerformance(e.target.id);
    setInputResult({ msg: null, type: null });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setInputResult({ msg: null, type: null });
  };

  const handlePresent = () => {
    setIsPresent(!isPresent);
    setInputResult({ msg: null, type: null });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (selectedDate === "") {
      setInputResult({ msg: "Välj ett datum", type: "danger" });
      return;
    }

    let storedData = JSON.parse(localStorage.getItem("studentData"));
    let currentStudent = storedData.find(
      (student) => student.id == JSON.parse(localStorage.getItem("studentId"))
    );
    let currentActivity = currentStudent.activities.find(
      (oneActivity) => oneActivity.id == activityId
    );
    let updateIndex = currentActivity.updates.findIndex(
      (oneUpdate) => oneUpdate.id == update.id
    );

    currentActivity.updates[updateIndex].date = selectedDate;
    currentActivity.updates[updateIndex].present = isPresent;

    if (isPresent) {
      currentActivity.updates[updateIndex].performance = performance;
      currentActivity.updates[updateIndex].comment = comment;
    } else {
      currentActivity.updates[updateIndex].absentComment = absentComment;
    }

    localStorage.setItem("studentData", JSON.stringify(storedData));

    window.location.reload(false);
  };

  return (
    <>
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
      <div className="flex-column align-items-center">
        <Row className="mb-3">
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
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          <div className="btn-group">
            <input
              type="radio"
              className="btn-check"
              name="presence-options"
              id="present"
              autoComplete="off"
              checked={isPresent}
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
              checked={!isPresent}
              onChange={handlePresent}
            />
            <label className="btn" htmlFor="absent">
              Frånvarande
            </label>
          </div>
        </Row>
        {isPresent ? (
          <Col
            className="border-0 rounded-1"
            style={{
              padding: "1em 1em 0.5em 1em",
              backgroundColor: "#ededed",
            }}
          >
            <Row>
              <Col>
                <Row>
                  <p style={{ marginBottom: "4px" }}>Hur gick det?</p>
                </Row>
                <Row>
                  <div className="btn-group">
                    <input
                      type="radio"
                      className="btn-check performance-btn"
                      name="performance-options"
                      id="good"
                      autoComplete="off"
                      checked={performance === "good"}
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
                        className="icons"
                      />
                    </label>

                    <input
                      type="radio"
                      className="btn-check performance-btn"
                      name="performance-options"
                      id="neutral"
                      autoComplete="off"
                      checked={performance === "neutral"}
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
                        className="icons"
                      />
                    </label>
                    <input
                      type="radio"
                      className="btn-check performance-btn"
                      name="performance-options"
                      id="bad"
                      autoComplete="off"
                      checked={performance === "bad"}
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
                        className="icons"
                      />
                    </label>
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="my-3">
              <div className="form-outline">
                <label htmlFor="comment">Kommentar:</label>
                <textarea
                  className="form-control border border-2 form-text"
                  rows="4"
                  id="comment"
                  style={{ resize: "none" }}
                  value={isPresent ? comment : absentComment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </Row>
          </Col>
        ) : (
          <Col
            className="border-0 rounded-1"
            style={{
              padding: "1em 1em 0.5em 1em",
              backgroundColor: "#ededed",
            }}
          >
            <Row className="mb-3">
              <div className="form-outline">
                <label htmlFor="absentComment">Kommentar:</label>
                <textarea
                  className="form-control border border-2 form-text"
                  rows="4"
                  id="absentComment"
                  style={{ resize: "none" }}
                  value={absentComment}
                  onChange={(e) => setAbsentComment(e.target.value)}
                />
              </div>
            </Row>
          </Col>
        )}
        <Row className="mt-3">
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Spara
            </button>
          </div>
        </Row>
      </div>
    </>
  );
}
