import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ActivityModal from "./ActivityModal";

export default function StudentModal({ show, student, onClose }) {
  const [activityToShow, setActivityToShow] = useState(null);
  const [showActivity, setShowActivity] = useState(false);
  const showActivityModal = () => setShowActivity(true);
  const hideActivityModal = () => setShowActivity(false);

  function handleActivityClick(e) {
    setActivityToShow(
      student.activities.find(
        (activity) => activity.id == e.currentTarget.value
      )
    );
    showActivityModal();
  }

  return (
    <>
      {activityToShow && (
        <ActivityModal
          show={showActivity}
          activity={activityToShow}
          student={student}
          onClose={hideActivityModal}
        />
      )}
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {student.name + " (åk. " + student.grade + ")"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex-column align-items-center" key={student.id}>
            <ul className="list-group list-group-flush">
              {student.activities.map((activity) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={activity.id}
                >
                  <p className="mb-0">
                    <span
                      className="align-middle"
                      style={{ fontWeight: "bold" }}
                    >
                      {activity.name}
                    </span>
                    <small className="align-middle" style={{ color: "grey" }}>
                      &nbsp;{activity.date}
                    </small>
                  </p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success btn-sm mx-2"
                      value={activity.id}
                      onClick={handleActivityClick}
                    >
                      Avstämning
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-sm mt-3"
                onClick={onClose}
              >
                Starta ny aktivitet
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
