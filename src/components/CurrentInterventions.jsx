import React, { useState } from "react";
import studentData from "../json/studentData.json";
import StudentModal from "./StudentModal";
import InterventionModal from "./InterventionModal";
import ConfirmationModal from "./ConfirmationModal";

export default function CurrentInterventions() {
  const [studentToShow, setStudentToShow] = useState(null);
  const [interventionToShow, setInterventionToShow] = useState(null);
  const [show, setShow] = useState(false);
  const [showIntervention, setShowIntervention] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const showModal = () => setShow(true);
  const showInterventionModal = () => setShowIntervention(true);
  const showConfirmationModal = () => setShowConfirmation(true);
  const hideModal = () => setShow(false);
  const hideInterventionModal = () => setShowIntervention(false);
  const hideConfirmationModal = () => setShowConfirmation(false);

  const currentStudents = studentData.students.filter(
    (student) => student.interventions.length > 0
  );

  function handleClick(e) {
    setStudentToShow(
      currentStudents.find((student) => student.id == e.currentTarget.value)
    );
    showModal();
  }

  function handleInterventionClick(e) {
    setInterventionToShow(
      studentToShow.interventions.find(
        (intervention) => intervention.id == e.currentTarget.value
      )
    );
    showInterventionModal();
  }

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal
          show={showConfirmation}
          closeModal={hideConfirmationModal}
          onDeny={hideInterventionModal}
        />
      )}
      {interventionToShow && (
        <InterventionModal
          show={showIntervention}
          intervention={interventionToShow}
          student={studentToShow}
          onClose={hideInterventionModal}
          showConfirmation={showConfirmationModal}
        />
      )}
      {studentToShow && (
        <StudentModal show={show} student={studentToShow} onClose={hideModal} onInterventionClick={handleInterventionClick} />
      )}
      <h4 className="mb-4 mt-5" style={{ textAlign: "center" }}>
        Pågående interventioner
      </h4>
      <div className="d-flex justify-content-center">
        <ul className="list-group" id="current-interventions">
          {currentStudents.map((student) => (
            <li
              className="list-group-item list-group-item-action flex-column align-items-center"
              key={student.id}
              value={student.id}
              onClick={handleClick}
            >
              <div className="d-flex w-150 justify-content-between">
                <h5 className="mb-1">{student.name + ' (åk. ' + student.grade + ')'}</h5>
                <small>{student.interventions[0].date}</small>
              </div>
              <p className="mb-1">
                {student.interventions.map((x) => x.name).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}