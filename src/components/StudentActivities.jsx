import React, { useEffect, useState } from "react";
import ActivityModal from "./ActivityModal";
import ConfirmationModal from "./ConfirmationModal";

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

            <ul className="list-group list-group-flush" style={{width: "90%" }}>
              {student.activities.filter((activity) => activity.cancelled === false).map((activity) => (
                <li
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  key={activity.id}
                  value={activity.id}
                  style={{ backgroundColor: page === 'assessment' ? "#ffffff" : "transparent" }}
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
                    <button
                      type="button"
                      className="btn btn-danger btn-sm float-end"
                      value={activity.id}
                      onClick={handleConfirmationClick}
                    >
                      Avsluta aktivitet
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">Inga pågående aktiviteter</p>
        )}
            <div className="d-flex d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-md mt-3"
                onClick={onClose}
              >
                Starta ny aktivitet
              </button>
            </div>
          </div>
    </>
  );
}