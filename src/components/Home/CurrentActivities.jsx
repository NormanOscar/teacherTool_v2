import React, { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";

import StudentModal from "./StudentModal";

export default function CurrentActivities() {
  const [studentToShow, setStudentToShow] = useState(null);
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch data from local storage only once when the component mounts
    const storedData = JSON.parse(localStorage.getItem("studentData"));
    if (storedData) {
      setStudentData(storedData);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const currentStudents = studentData.filter(
    (student) => student.activities.length > 0 && student.activities.every(activity => activity.cancelled === false)
  );
  console.log(currentStudents);

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
      <Card className="p-3 my-2">
        <h3 className="mb-4" style={{ textAlign: "center" }}>
          Pågående aktiviteter
        </h3>
        <Col>
          <Row className="d-flex justify-content-center">
            <ul className="list-group" id="current-activities">
              {currentStudents.length !== 0 ? (
                currentStudents
                  .filter((student) => student.activeActivities > 0)
                  .map((student) => (
                    <li
                      className="list-group-item list-group-item-action flex-column align-items-center"
                      key={student.id}
                      value={student.id}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex w-150 justify-content-between">
                        <h5 className="mb-1">
                          {student.name + " (" + student.class + ")"}
                        </h5>
                        <small>{student.activities[0].date}</small>
                      </div>
                      <p className="mb-1">
                        {student.activities
                          .filter((activity) => !activity.cancelled)
                          .map((x) => x.name)
                          .join(", ")}
                      </p>
                    </li>
                  ))
              ) : (
                <p className="text-center m-0">Inga pågående aktiviteter</p>
              )}
            </ul>
          </Row>
        </Col>
      </Card>
    </>
  );
}
