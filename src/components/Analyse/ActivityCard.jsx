import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";

library.add(faFaceSmile, faFaceMeh, faFaceFrown);

export default function ActivityCard({ student, performances }) {
  return (
    <>
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
          style={{ maxHeight: "500px" }}
        >
          {student.activities.length > 0 ? (
            student.activities.map((activity) => (
              <li
                className="list-group-item"
                key={activity.id}
                style={{ marginBottom: "0.5em" }}
              >
                <p className="mb-0 d-flex justify-content-between">
                  <span className="align-middle" style={{ fontWeight: "bold" }}>
                    {activity.name}
                  </span>
                  <small className="align-middle" style={{ color: "grey" }}>
                    {activity.date} -{" "}
                    {activity.cancelDate === ""
                      ? "Pågående"
                      : activity.cancelDate}
                  </small>
                </p>
                <div>
                  <p>Avstämningar:</p>
                  {activity.updates.length > 0 ? (
                    <ul className="mx-2">
                      {activity.updates
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((update, index) => (
                          <li key={index}>
                            <Row className="d-flex justify-content-between">
                              <span
                                style={{
                                  color: "grey",
                                  width: "fit-content",
                                }}
                              >
                                {update.date}
                              </span>
                              {update.present && (
                                <>
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
                                  {update.performance === "neutral" && (
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
                                </>
                              )}
                              <span
                                style={{
                                  color: update.present ? "#20b26b" : "#ff3d4d",
                                  width: "fit-content",
                                }}
                              >
                                {update.present ? "Närvarande" : "Frånvarande"}
                              </span>
                            </Row>
                            <Row>
                              {update.comment !== "" ? (
                                <p>{update.comment}</p>
                              ) : (
                                <p>Ingen kommentar</p>
                              )}
                            </Row>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p style={{ paddingLeft: "1em" }}>Inga avstämningar</p>
                  )}
                </div>
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
