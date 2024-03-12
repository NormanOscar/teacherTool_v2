import { Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrash, faPen);

export default function StudentList({ showModal, setObject, setEditType }) {
  let students = JSON.parse(localStorage.getItem("studentData"));

  const removeStudent = (e) => {
    e.preventDefault();
    let studentId = e.currentTarget.id;
    let studentIndex = students.findIndex((student) => student.id == studentId);
    students.splice(studentIndex, 1);

    localStorage.setItem("studentData", JSON.stringify(students));

    window.location.reload(false);
  };

  const handleEditClick = (e) => {
    let studentId = Number(e.currentTarget.id);
    let selectedStudent = students.find((student) => student.id === studentId);
    setObject(selectedStudent);
    setEditType("student");
    showModal();
  };

  return (
    <>
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Elever
        </h4>
        <span className="text-end px-2 mb-1">Totalt: {students.length}</span>
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
                        {student.name + " (" + student.class + ")"}
                      </p>
                      <p className="mb-0">{student.email}</p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <div className="mx-1">
                        <FontAwesomeIcon
                          icon={faPen}
                          size="lg"
                          className="icons"
                          id={student.id}
                          onClick={handleEditClick}
                        />
                      </div>
                      <div className="mx-1">
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="lg"
                          color="red"
                          id={student.id}
                          className="icons"
                          onClick={removeStudent}
                        />
                      </div>
                    </Col>
                  </Row>
                </li>
              );
            })}
        </ul>
      </Card>
    </>
  );
}
