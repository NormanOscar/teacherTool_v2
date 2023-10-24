import React, { useState } from "react";
import data from "../json/data.json";
import studentData from "../json/studentData.json";
import Modal from 'react-bootstrap/Modal';

export default function CurrentInterventions() {
  const [studentToShow, setStudentToShow] = useState(null);
  const showModal = (student) => setStudentToShow(student);
  const hideModal = () => setStudentToShow(false);
  //const [selectedStudent, setSelectedStudent] = useState(0);

  const currentStudents = studentData.students.filter(
    (student) => student.interventions.length > 0
  )

  function handleClick(e) {
    showModal(currentStudents.find((student) => student.id == e.currentTarget.value));
  }
  
  return (
    <>
      {studentToShow && (
        <StudentModal show={studentToShow} student={studentToShow} onClose={hideModal} />
      )}
      <h4 className="mb-4 mt-5" style={{ textAlign: "center" }}>
        Pågående interventioner
      </h4>
      <div
        className="d-flex justify-content-center"
        id="current-interventions"
      >
        <ul className="list-group w-50">
          {currentStudents.map((student) => (
            <li className="list-group-item list-group-item-action flex-column align-items-center" key={student.id} value={student.id} onClick={handleClick}>
              <div className="d-flex w-150 justify-content-between">
                <h5 className="mb-1">{student.name}</h5>
                <small>{student.interventions[0].date}</small>
              </div>
              <p className="mb-1">
                {student.interventions[0].name}
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
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{student.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-group-item list-group-item-action flex-column align-items-center" key={student.id}>
          {
            student.interventions.map((intervention) => (
              <div className="d-flex gap-3 justify-content-between" key={intervention.id}>
                <p className="mb-1">
                  {intervention.name}
                </p>
                <small>{intervention.date}</small>
              </div>
            ))
          }
          <div className="d-flex w-100 mt-3 justify-content-center">
            <div>
              <button type="button" className="btn btn-success btn-sm mx-2">Utförd</button>
            </div>
            <div>
              <button type="button" className="btn btn-danger btn-sm mx-2">Frånvarande</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}