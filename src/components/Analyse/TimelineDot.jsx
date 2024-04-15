import React from "react";
import { OverlayTrigger, Popover, Col, Row } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";

library.add(faFaceSmile, faFaceMeh, faFaceFrown);

export default function TimelineDot({ dot, index }) {
  console.log(dot);
  const assessmentPopover = (
    <Popover>
      <Popover.Header as="h3">{"Bedömning"}</Popover.Header>
      <Popover.Body>
        <Col>
          <Row className="d-flex justify-content-center text-center text-muted mb-1">
            <span
              style={{
                width: "fit-content",
              }}
            >
              {dot.obj.date}
            </span>
          </Row>
          <Row className="d-flex justify-content-center text-center mb-1">
            <span
              style={{
                fontWeight: "bold",
                width: "fit-content",
              }}
            >
              {dot.obj.gradingTool}
            </span>
          </Row>
          <Row className="d-flex justify-content-center text-center mb-1">
            <Row className="d-flex justify-content-center">
              <span
                style={{
                  width: "fit-content",
                }}
              >
                {dot.obj.area}
              </span>
            </Row>
            <Row className="d-flex justify-content-center">
              <span
                style={{
                  width: "fit-content",
                }}
              >
                &darr;
              </span>
            </Row>
          </Row>
          <Row className="d-flex justify-content-center text-center mb-1">
            <Row className="d-flex justify-content-center">
              <span
                style={{
                  width: "fit-content",
                }}
              >
                {dot.obj.criteria}
              </span>
            </Row>
            <Row className="d-flex justify-content-center">
              <span
                style={{
                  width: "fit-content",
                }}
              >
                &darr;
              </span>
            </Row>
          </Row>
          <Row className="d-flex justify-content-center text-center mb-1">
            <span
              style={{
                width: "fit-content",
              }}
            >
              {dot.obj.level}
            </span>
          </Row>
          <Row className="d-flex justify-content-center mb-1 mt-2">
            <Row className="d-flex justify-content-center">
              <span
                style={{
                  width: "fit-content",
                  color: "grey",
                }}
              >
                Kommentar:
              </span>
            </Row>
            <Row className="d-flex justify-content-center">
              <p
                className="m-0 py-0 text-center"
                style={{
                  width: "fit-content",
                }}
              >
                {dot.obj.comment !== "" ? dot.obj.comment : "Ingen kommentar"}
              </p>
            </Row>
          </Row>
        </Col>
      </Popover.Body>
    </Popover>
  );

  const updatePopover = (
    <Popover>
      <Popover.Header as="h3">{"Avstämning"}</Popover.Header>
      <Popover.Body>
        <Col className="text-center">
          <Row className="d-flex justify-content-center mb-1">
            <span>{dot.obj.date}</span>
          </Row>
          {dot.activity && (
            <Row className="d-flex justify-content-center mb-1">
              <span className="fw-bold">{dot.activity.name}</span>
            </Row>
          )}
          <Row className="d-flex justify-content-center mb-1">
            <span
              style={{
                color: "#20b26b",
              }}
            >
              Närvarande
            </span>
          </Row>
          <Row className="d-flex justify-content-center mb-1">
            {dot.obj.performance === "good" && (
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
            {dot.obj.performance === "neutral" && (
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
            {dot.obj.performance === "bad" && (
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
          </Row>
          <Row className="d-flex justify-content-center mb-1">
            <p className="m-0 py-0">
              {dot.obj.comment !== "" ? dot.obj.comment : "Ingen kommentar"}
            </p>
          </Row>
        </Col>
      </Popover.Body>
    </Popover>
  );

  const absentPopover = (
    <Popover>
      <Popover.Header as="h3">{dot.type}</Popover.Header>
      <Popover.Body>
        <Col className="text-center">
          <Row className="d-flex justify-content-center mb-1">
            <span className="text-muted">{dot.obj.date}</span>
          </Row>
          {dot.activity && (
            <Row className="d-flex justify-content-center mb-1">
              <span className="fw-bold">{dot.activity.name}</span>
            </Row>
          )}
          <Row className="d-flex justify-content-center mb-1">
            <span
              style={{
                color: "#ff3d4d",
              }}
            >
              Frånvarande
            </span>
          </Row>
          <Row className="d-flex justify-content-center mb-1">
            <p className="m-0 py-0 text-center">
              {dot.obj.comment !== "" ? dot.obj.comment : "Ingen kommentar"}
            </p>
          </Row>
        </Col>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        placement="top"
        trigger={["click"]}
        overlay={
          dot.present === false
            ? absentPopover
            : dot.type === "Bedömning"
            ? assessmentPopover
            : dot.type === "Avstämning"
            ? updatePopover
            : null
        }
      >
        {dot.type === "Bedömning" ? (
          <div
            key={"dot" + (index + 1)}
            className="timeLine-dot dot-on-timeLine"
            style={{
              backgroundColor: dot.present ? dot.color : "#FF3126"
            }}
          />
        ) : (
          <div
            key={"dot" + (index + 1)}
            className="timeLine-dot dot-on-timeLine"
            style={{
              backgroundColor: !dot.activity.cancelled
                ? dot.present
                ? dot.color
                : "#FF3126"
                : undefined,
              backgroundImage: dot.activity.cancelled
                ? 'linear-gradient(135deg, #D0BFFF 50%, #FF3126 50%)' : 'none',
            }}
          />
        )}
      </OverlayTrigger>
    </>
  );
}
