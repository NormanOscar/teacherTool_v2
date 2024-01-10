import React, { useEffect, useState } from "react";
import ActivityModal from "./ActivityModal";
import ConfirmationModal from "./ConfirmationModal";
import NewActivity from "./NewActivity";
import { Row, Col } from "react-bootstrap";

export default function StudentActivities({ student, onClose, page }) {
  const [activityToShow, setActivityToShow] = useState(null);
  const [showActivity, setShowActivity] = useState(false);
  const showActivityModal = () => setShowActivity(true);
  const hideActivityModal = () => setShowActivity(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationActivity, setConfirmationActivity] = useState(null);
  const showConfirmationModal = () => setShowConfirmation(true);
  const hideConfirmationModal = () => setShowConfirmation(false);

  function handleActivityClick(e) {
    setActivityToShow(
      student.activities.find(
        (activity) => activity.id == e.currentTarget.value
      )
    );
    showActivityModal();
  }

  function handleConfirmationClick(e) {
    setConfirmationActivity(e.currentTarget.value);
    showConfirmationModal();
  }

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal
          show={showConfirmation}
          closeModal={hideConfirmationModal}
          activityId={confirmationActivity}
          selectedStudent = {student}
        />
      )}
      {activityToShow && (
        <ActivityModal
          show={showActivity}
          activity={activityToShow}
          selectedStudent={student}
          onClose={hideActivityModal}
        />
      )}
      <div className="flex-column align-items-center">
        {student.activeActivities > 0 ? (
          <div className="d-flex justify-content-center">
            <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{width: page === "assessment" ? "90%" : "100%", maxHeight: '300px' }}>
              {student.activities.filter((activity) => !activity.cancelled).map((activity) => (
                <li
                  className="list-group-item list-group-item-action"
                  key={activity.id}
                  value={activity.id}
                  style={{ backgroundColor: page === 'assessment' ? "#ffffff" : "transparent" }}
                >
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col>
                        <Col>
                          <Row>
                            <p className="mb-0 align-middle" style={{ fontWeight: "bold" }}>
                              {activity.name}
                            </p> 
                          </Row>
                          <Row>
                            <small className="align-middle" style={{ color: "grey" }}>
                              &nbsp;{activity.date}
                            </small>
                          </Row>
                        </Col>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-sm"
                          value={activity.id}
                          onClick={handleActivityClick}
                          style={{ width: "120px", marginRight: "5px", backgroundColor: '#20b26b' }}
                        >
                          Avstämning
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          value={activity.id}
                          onClick={handleConfirmationClick}
                          style={{ width: "120px" }}
                        >
                          Avsluta aktivitet
                        </button>
                    </Col>
                  </Row>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">Inga pågående aktiviteter</p>
        )}
        <NewActivity
          selectedStudent={student}
          page="assessment"
        />
      </div>
    </>
  );
}