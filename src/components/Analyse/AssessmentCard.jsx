import { Row, Card } from "react-bootstrap";
import { getTeacher } from "../func";

export default function AssessmentCard({ student }) {
  return (
    <>
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Bedömningar
        </h4>
        {student.assessments.length > 0 ? (
          <div className="d-flex justify-content-center">
            <ul
              className="list-group list-group-flush overflow-auto custom-scrollbar"
              style={{ maxHeight: "300px", width: "100%" }}
            >
              {student.assessments.map((assessment, index) => (
                <li
                  className="list-group-item"
                  key={index}
                  style={{ marginBottom: "0.5em" }}
                >
                  <p className="mb-0 d-flex justify-content-between">
                    <span
                      className="align-middle"
                      style={{ fontWeight: "bold" }}
                    >
                      {assessment.gradingTool}
                    </span>
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
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">
            Det har inte utförts några bedömningar
          </p>
        )}
      </Card>
    </>
  )
}