import React, { useState } from "react";
import data from "../json/data.json";
import studentData from "../json/studentData.json";
import Modal from 'react-bootstrap/Modal';

export default function CurrentInterventions() {
  const [studentToShow, setStudentToShow] = useState(null);
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const currentStudents = studentData.students.filter(
    (student) => student.interventions.length > 0
  )

  function handleClick(e) {
    setStudentToShow(currentStudents.find((student) => student.id == e.currentTarget.value));
    showModal();
  }
  
  return (
    <>
      {studentToShow && (
        <StudentModal show={show} student={studentToShow} onClose={hideModal} />
      )}
      <h4 className="mb-4 mt-5" style={{ textAlign: "center" }}>
        Pågående interventioner
      </h4>
      <div
        className="d-flex justify-content-center"
      >
        <ul className="list-group" id="current-interventions">
          {currentStudents.map((student) => (
            <li className="list-group-item list-group-item-action flex-column align-items-center" key={student.id} value={student.id} onClick={handleClick}>
              <div className="d-flex w-150 justify-content-between">
                <h5 className="mb-1">{student.name}</h5>
                <small>{student.interventions[0].date}</small>
              </div>
              <p className="mb-1">
                {student.interventions.map(x => x.name).join(', ')}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function StudentModal({ show, student, onClose}) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{student.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex-column align-items-center" key={student.id}>
          <ul className="list-group list-group-flush">
            {
              student.interventions.map((intervention) => (
                <li className="list-group-item d-flex justify-content-between" key={intervention.id}>
                  <p className="mb-1">
                    <span className="align-middle" style={{fontWeight: "bold"}}>{intervention.name}</span>
                    <small className="align-middle" style={{color: "grey"}}>&nbsp;{intervention.date}</small>
                  </p>
                  <div>
                    <button type="button" className="btn btn-success btn-sm mx-2" onClick={onClose}>Utförd</button>
                    <button type="button" className="btn btn-danger btn-sm mx-2" onClick={onClose}>Frånvarande</button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  )
}