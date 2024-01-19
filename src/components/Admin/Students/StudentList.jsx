import { Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrash, faPen);

export default function AddUser() {
  let students = JSON.parse(localStorage.getItem("studentData"));

  const removeStudent = (e) => {
    let studentId = e.currentTarget.id;
    let studentIndex = students.findIndex((student) => student.id === studentId);
    students.splice(studentIndex, 1);

    localStorage.setItem("studentData", JSON.stringify(students));

    window.location.reload(false);
  };
  return(
    <Card className="p-4 my-2">
      <h4 className="mb-4" style={{ textAlign: "center" }}>
        Elever
      </h4>
      <ul
        className="list-group list-group-flush overflow-auto custom-scrollbar"
        style={{ maxHeight: "400px" }}
      >
        {students &&
          students.map((student, index) => {
            return (
              <li key={index} className="list-group-item">
                <Row>
                  <Col>
                    <p className="mb-0 d-flex justify-content-between">
                      {student.name + " (åk. " + student.grade + ")"}
                    </p>
                    <p className="mb-0">{student.email}</p>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    <FontAwesomeIcon
                      icon={faPen}
                      size="lg"
                      id={student.id}
                      className="icons"
                    />
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      color="red"
                      id={student.id}
                      className="icons"
                      onClick={removeStudent}
                    />
                  </Col>
                </Row>
              </li>
            );
          })}
      </ul>
    </Card>
  )
}