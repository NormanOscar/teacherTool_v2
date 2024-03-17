import { OverlayTrigger, Popover } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faInfoCircle);

export default function StudentInfoPopover({ student }) {
  return (
    <>
      <OverlayTrigger
        placement="left-start"
        trigger="click"
        overlay={
          <Popover>
            <Popover.Header as="h3">{student.name}</Popover.Header>
            <Popover.Body>
              <p>
                <strong>Födelseår:</strong> {student.birthYear}
              </p>
              <p>
                <strong>Klass:</strong> {student.class}
              </p>
              <p>
                <strong>Ämne:</strong>{" "}
                {student.subject == "1" ? "Svenska" : "Svenska som andraspråk"}
              </p>
              {student.bornInSweden ? (
                <>
                  <p>
                    <strong>Född i Sverige</strong>
                  </p>
                </>
              ) : (
                <p>
                  <strong>Ankomst:</strong> {student.arrivalYear}
                </p>
              )}
            </Popover.Body>
          </Popover>
        }
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          size="sm"
          className="mx-2"
          style={{ cursor: "pointer" }}
        />
      </OverlayTrigger>
    </>
  );
}
