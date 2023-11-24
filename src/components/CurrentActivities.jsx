import React, { useState } from "react";
import studentData from "../json/studentData.json";
import StudentModal from "./StudentModal";

export default function CurrentActivities() {
  const [studentToShow, setStudentToShow] = useState(null);
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const currentStudents = studentData.students.filter(
    (student) => student.activities.length > 0
  );

  function handleClick(e) {
    setStudentToShow(
      currentStudents.find((student) => student.id == e.currentTarget.value)
    );
    showModal();
  }

  return (
    <>
      
      {studentToShow && (
        <StudentModal show={show} student={studentToShow} onClose={hideModal} />
      )}
      <h4 className="mb-4 mt-5" style={{ textAlign: "center" }}>
        Pågående aktiviteter
      </h4>
      <div className="d-flex justify-content-center">
        <ul className="list-group" id="current-activities">
          {currentStudents.map((student) => (
            <li
              className="list-group-item list-group-item-action flex-column align-items-center"
              key={student.id}
              value={student.id}
              onClick={handleClick}
            >
              <div className="d-flex w-150 justify-content-between">
                <h5 className="mb-1">{student.name + ' (åk. ' + student.grade + ')'}</h5>
                <small>{student.activities[0].date}</small>
              </div>
              <p className="mb-1">
                {student.activities.map((x) => x.name).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}