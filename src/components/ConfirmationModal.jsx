import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { getCurrentDate } from "./func";
import { Col, Row } from "react-bootstrap";

export default function ConfirmationModal({ show, closeModal, activityId, selectedStudent }) {
  const [comment, setComment] = useState("");

  function onAccept() {
    const storedData = JSON.parse(localStorage.getItem('studentData'));
    const currentStudent = storedData.find((student) => student.id == selectedStudent.id);
    currentStudent.activeActivities--;
    currentStudent.cancelledActivities++;
    const currentActivity = currentStudent.activities.find((activity) => activity.id == activityId);
    currentActivity.cancelled = true;
    currentActivity.cancelComment = comment;
    currentActivity.cancelDate = getCurrentDate();
    localStorage.setItem('studentData', JSON.stringify(storedData));
    window.location.reload(false);
    closeModal();
  }

  function onClose () {
    closeModal();
  }

  return (
    <Modal dialogClassName="confirmationModal" show={show} onHide={onClose} centered>
      <Modal.Body>
        <p>Vill du verkligen avsluta aktiviteten?</p>
        <Col 
          className="border-0 rounded-1" style={{
            padding: "1em",
            margin: "1em 0 1em 0",
            backgroundColor: "#ededed",
          }}>
          <Row className="my-3">
            <div className="form-outline">
              <label htmlFor="comment">Kommentar:</label>
              <textarea
                className="form-control border border-2 form-text"
                rows="4"
                id="comment"
                style={{ resize: "none" }}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Avbryt</button>
        <button type="button" className="btn btn-danger" onClick={onAccept}>Avsluta</button>
      </Modal.Footer>
    </Modal>
  );
}