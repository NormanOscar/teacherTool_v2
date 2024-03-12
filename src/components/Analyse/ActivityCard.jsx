import { Card, Row, Col, Accordion } from "react-bootstrap";
import { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./EditModal";

library.add(faFaceSmile, faFaceMeh, faFaceFrown, faPen, faTrash);

export default function ActivityCard({ student, performances }) {
  const [showEdit, setShowEdit] = useState(false);
  const showModal = () => setShowEdit(true);
  const hideModal = () => setShowEdit(false);
  const [editObj, setEditObj] = useState(null);
  const [activityId, setActivityId] = useState(null);

  const handleEditClick = (activityId, updateId) => {
    let activity = student.activities.find((a) => a.id === activityId);
    let update = activity.updates.find((u) => u.id === updateId);
    setActivityId(activityId);
    setEditObj(update);
    showModal();
  };

  const removeUpdate = (activityId, updateId) => {
    let storedData = JSON.parse(localStorage.getItem("studentData"));
    let studentId = JSON.parse(localStorage.getItem("studentId"));
    let currentStudent = storedData.find((student) => student.id === studentId);
    let activityIndex = currentStudent.activities.findIndex(
      (activity) => activity.id === activityId
    );
    let updateIndex = currentStudent.activities[
      activityIndex
    ].updates.findIndex((update) => update.id === updateId);

    currentStudent.activities[activityIndex].updates.splice(updateIndex, 1);
    localStorage.setItem("studentData", JSON.stringify(storedData));
    window.location.reload(false);
  }

  return (
    <>
      {showEdit && (
        <EditModal
          show={showEdit}
          obj={editObj}
          activityId={activityId}
          onClose={hideModal}
          type="activityUpdate"
        />
      )}
      <Card className="p-4 my-2">
        <h4 className="mb-4" style={{ textAlign: "center" }}>
          Aktiviteter
        </h4>
        <Row className="mb-2">
          <Col className="d-flex align-items-center justify-content-center">
            <span className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faFaceSmile}
                size="xl"
                style={{
                  backgroundColor: "#20b26b",
                  width: "fit-content",
                  borderRadius: "5px",
                }}
                className="p-2"
              />
              &nbsp;{performances.good.amount} ({performances.good.percentage}%)
            </span>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <span className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faFaceMeh}
                size="xl"
                style={{
                  backgroundColor: "#ffe207",
                  width: "fit-content",
                  borderRadius: "5px",
                }}
                className="p-2"
              />
              &nbsp;{performances.neutral.amount} (
              {performances.neutral.percentage}%)
            </span>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <span className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faFaceFrown}
                size="xl"
                style={{
                  backgroundColor: "#ff3d4d",
                  width: "fit-content",
                  borderRadius: "5px",
                }}
                className="p-2"
              />
              &nbsp;{performances.bad.amount} ({performances.bad.percentage}%)
            </span>
          </Col>
        </Row>
        <ul
          className="list-group list-group-flush overflow-auto custom-scrollbar"
          style={{ maxHeight: "360px" }}
        >
          {student.activities.length > 0 ? (
            student.activities.map((activity) => (
              <li className="list-group-item" key={activity.id}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <p className="mb-0 h6">
                        <span
                          className="align-middle"
                          style={{ fontWeight: "bold" }}
                        >
                          {activity.name + " - "}
                        </span>
                        <span
                          className="align-middle"
                          style={{ color: "grey" }}
                        >
                          {activity.date} -{" "}
                          {activity.cancelDate === ""
                            ? "Pågående"
                            : activity.cancelDate}
                        </span>
                      </p>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <p className="my-0">Avstämningar:</p>
                        {activity.updates.length > 0 ? (
                          <ul className="mx-2 list-group list-group-flush">
                            {activity.updates
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((update, index) => (
                                <li
                                  key={index}
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                  <div>
                                    <Row className="my-1">
                                      <span
                                        style={{
                                          color: "grey",
                                          width: "fit-content",
                                        }}
                                      >
                                        {update.date}
                                      </span>
                                      <span
                                        style={{
                                          color: update.present
                                            ? "#20b26b"
                                            : "#ff3d4d",
                                          width: "fit-content",
                                        }}
                                      >
                                        {update.present
                                          ? "Närvarande"
                                          : "Frånvarande"}
                                      </span>
                                    </Row>
                                    <Row className="my-1">
                                      {update.present && (
                                        <>
                                          <p className="m-0 ms-2">
                                            {update.performance === "good" && (
                                              <FontAwesomeIcon
                                                icon={faFaceSmile}
                                                size="xl"
                                                style={{
                                                  backgroundColor: "#20b26b",
                                                  width: "fit-content",
                                                  borderRadius: "50%",
                                                }}
                                                className="p-1"
                                              />
                                            )}
                                            {update.performance ===
                                              "neutral" && (
                                              <FontAwesomeIcon
                                                icon={faFaceMeh}
                                                size="xl"
                                                style={{
                                                  backgroundColor: "#ffe207",
                                                  width: "fit-content",
                                                  borderRadius: "50%",
                                                }}
                                                className="p-1"
                                              />
                                            )}
                                            {update.performance === "bad" && (
                                              <FontAwesomeIcon
                                                icon={faFaceFrown}
                                                size="xl"
                                                style={{
                                                  backgroundColor: "#ff3d4d",
                                                  width: "fit-content",
                                                  borderRadius: "50%",
                                                }}
                                                className="p-1"
                                              />
                                            )}
                                          </p>
                                        </>
                                      )}
                                    </Row>
                                    <Row className="my-1">
                                      {update.comment !== "" ? (
                                        <p className="m-0">{update.comment}</p>
                                      ) : (
                                        <p className="m-0">Ingen kommentar</p>
                                      )}
                                    </Row>
                                  </div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      size="lg"
                                      className="icons mx-1"
                                      onClick={() => handleEditClick(activity.id, update.id)}
                                      style={{ width: "fit-content" }}
                                    />
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      size="lg"
                                      color="red"
                                      className="icons mx-1"
                                      onClick={() => removeUpdate(activity.id, update.id)}
                                      style={{ width: "fit-content" }}
                                    />
                                  </div>
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <p style={{ paddingLeft: "1em" }}>
                            Inga avstämningar
                          </p>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </li>
            ))
          ) : (
            <p className="text-center">Det finns inga aktiviteter</p>
          )}
        </ul>
      </Card>
    </>
  );
}
