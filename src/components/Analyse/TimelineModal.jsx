import { Row, Modal } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";

library.add(faFaceSmile, faFaceMeh, faFaceFrown);

import { getTeacher } from "../func";

export default function TimeLineModal({ item, show, onClose }) {
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton></Modal.Header>
        {item.type === "Bedömning" && (  
          <Modal.Body>
            <p className="mb-0 d-flex justify-content-between">
              <span
                className="align-middle"
                style={{ fontWeight: "bold" }}
              >
                {item.obj.gradingTool}
              </span>
              <small
                className="align-middle"
                style={{ color: "grey" }}
              >
                {item.obj.date}
              </small>
            </p>
            {item.obj.teacher && (
              <span>
                Lärare:{" "}
                {getTeacher(item.obj.teacher).firstName +
                  " " +
                  getTeacher(item.obj.teacher).lastName}
              </span>
            )}
            <div>
              <Row className="d-flex justify-content-between">
                <span style={{ width: "fit-content" }}>
                  {item.obj.area} &rarr; {item.obj.criteria}{" "}
                  &rarr; {item.obj.level}
                </span>
              </Row>
              <Row className="d-flex justify-content-between">
                <span
                  style={{
                    width: "fit-content",
                    color: "grey",
                  }}
                >
                  Kommentar: {item.obj.comment}
                </span>
              </Row>
            </div>
          </Modal.Body>
        )}
        {item.type === "Aktivitet" && (
          <Modal.Body>
            <p className="mb-0 d-flex justify-content-between">
              <span className="align-middle" style={{ fontWeight: "bold" }}>
                {item.obj.name}
              </span>
              <small className="align-middle" style={{ color: "grey" }}>
                {item.obj.date} -{" "}
                {item.obj.cancelDate === ""
                  ? "Pågående"
                  : item.obj.cancelDate}
              </small>
            </p>
          </Modal.Body>
        )}
        {item.type === "Avstämning" && (
          <Modal.Body>
            <Row className="d-flex justify-content-between">
              <span
                style={{
                  color: "grey",
                  width: "fit-content",
                }}
              >
                {item.obj.date}
              </span>
              {item.obj.present && (
                <>
                  {item.obj.performance === "good" && (
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
                  {item.obj.performance === "neutral" && (
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
                  {item.obj.performance === "bad" && (
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
                  color: item.obj.present ? "#20b26b" : "#ff3d4d",
                  width: "fit-content",
                }}
              >
                {item.obj.present ? "Närvarande" : "Frånvarande"}
              </span>
            </Row>
            <Row>
              {item.obj.comment !== "" ? (
                <p>{item.obj.comment}</p>
              ) : (
                <p>Ingen kommentar</p>
              )}
            </Row>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
