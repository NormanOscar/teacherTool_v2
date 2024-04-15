import { useState } from "react";
import { Row, Card } from "react-bootstrap";
import { getTeacher } from "../func";
import EditModal from "./EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPen, faTrash);

export default function AssessmentCard({ student }) {
  const [showEdit, setShowEdit] = useState(false);
  const showModal = () => setShowEdit(true);
  const hideModal = () => setShowEdit(false);
  const [editObj, setEditObj] = useState(null);

  const handleEditClick = (e) => {
    let currentAssessment = student.assessments.find(
      (assessment) => assessment.id == e.currentTarget.id
    );
    setEditObj(currentAssessment);
    showModal();
  };

  const removeAssessment = (e) => {
    let confirmDelete = window.confirm(
      "Är du säker på att du vill ta bort denna bedömning?"
    );
    if (!confirmDelete) {
      return;
    }
    let storedData = JSON.parse(localStorage.getItem("studentData"));
    let studentId = JSON.parse(localStorage.getItem("studentId"));
    let currentStudent = storedData.find((student) => student.id === studentId);
    let assessmentIndex = currentStudent.assessments.findIndex(
      (assessment) => assessment.id == e.currentTarget.id
    );

    currentStudent.assessments.splice(assessmentIndex, 1);
    localStorage.setItem("studentData", JSON.stringify(storedData));
    window.location.reload(false);
  };

  return (
    <>
      {showEdit && (
        <EditModal
          show={showEdit}
          student={student}
          obj={editObj}
          onClose={hideModal}
          type="assessment"
        />
      )}
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Bedömningar
        </h4>
        {student.assessments.length > 0 ? (
          <div className="d-flex justify-content-center">
            <ul
              className="list-group list-group-flush overflow-auto custom-scrollbar"
              style={{ maxHeight: "410px", width: "100%" }}
            >
              {student.assessments
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((assessment, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                    style={{ marginBottom: "0.5em" }}
                  >
                    <div>
                      <p className="mb-0 d-flex justify-content-between">
                        <span
                          className="align-middle"
                          style={{ fontWeight: "bold" }}
                        >
                          {assessment.gradingTool}
                        </span>
                      </p>
                      <p className="m-0">
                        <small
                          className="align-middle"
                          style={{ color: "grey" }}
                        >
                          {assessment.date}
                        </small>
                      </p>
                      {assessment.teacher && (
                        <span>
                          Lärare:{" "}
                          {getTeacher(assessment.teacher).firstName +
                            " " +
                            getTeacher(assessment.teacher).lastName}
                        </span>
                      )}
                      <div>
                        <Row className="d-flex justify-content-between">
                          <span style={{ width: "fit-content" }}>
                            {assessment.area} &rarr; {assessment.criteria}{" "}
                            &rarr; {assessment.level}
                          </span>
                        </Row>
                        <Row className="d-flex justify-content-between">
                          <span
                            style={{
                              width: "fit-content",
                              color: "grey",
                            }}
                          >
                            Kommentar: {assessment.comment}
                          </span>
                        </Row>
                      </div>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faPen}
                        size="lg"
                        className="icons mx-1"
                        id={assessment.id}
                        onClick={handleEditClick}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="lg"
                        color="red"
                        id={assessment.id}
                        className="icons mx-1"
                        onClick={removeAssessment}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">Det har inte utförts några bedömningar</p>
        )}
      </Card>
    </>
  );
}
