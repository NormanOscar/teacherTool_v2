import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import EditFirstName from "../components/Profile/EditFirstName";
import EditLastName from "../components/Profile/EditLastName";
import EditEmail from "../components/Profile/EditEmail";
import EditUsername from "../components/Profile/EditUsername";
import EditPassword from "../components/Profile/EditPassword";

library.add(faEdit);

export default function Profile() {
  const [user, setUser] = useState({});
  const [chosenField, setChosenField] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("login") || !localStorage.getItem("userId") || !localStorage.getItem("studentData")) {
      window.location.href = "/login";
    }

    let userId = JSON.parse(localStorage.getItem("userId"));
    let users = JSON.parse(localStorage.getItem("userData"));
    setUser(users.find((user) => user.id === userId));
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="my-4">
          <Col xs={12} md={4} style={{ paddingTop: "2em" }}></Col>
          <Col xs={12} md={4} style={{ paddingTop: "2em" }}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Profil
              </h4>
              <ul
                className="list-group list-group-flush overflow-auto custom-scrollbar"
                style={{ maxHeight: "300px" }}
              >
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>Förnamn:</strong> {user.firstName}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="lg"
                        id="0"
                        className="icons"
                        onClick={() => setChosenField("0")}
                      />
                    </Col>
                  </Row>
                </li>
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>Efternamn:</strong> {user.lastName}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="lg"
                        id="1"
                        className="icons"
                        onClick={() => setChosenField("1")}
                      />
                    </Col>
                  </Row>
                </li>
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>E-post:</strong> {user.email}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="lg"
                        id="2"
                        className="icons"
                        onClick={() => setChosenField("2")}
                      />
                    </Col>
                  </Row>
                </li>
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>Användarnamn:</strong> {user.username}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="lg"
                        id="3"
                        className="icons"
                        onClick={() => setChosenField("3")}
                      />
                    </Col>
                  </Row>
                </li>
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>Lösenord:</strong> {user.password}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="lg"
                        id="4"
                        className="icons"
                        onClick={() => setChosenField("4")}
                      />
                    </Col>
                  </Row>
                </li>
              </ul>
            </Card>
          </Col>
          <Col xs={12} md={4} style={{ paddingTop: "2em" }}>
            {chosenField && (
              <>
                {chosenField === "0" && <EditFirstName />}
                {chosenField === "1" && <EditLastName />}
                {chosenField === "2" && <EditEmail />}
                {chosenField === "3" && <EditUsername />}
                {chosenField === "4" && <EditPassword />}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
