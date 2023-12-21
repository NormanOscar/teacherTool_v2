import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import EditCard from "../components/EditCard";

library.add(faEdit);

export default function Profile() {
  const [user, setUser] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [chosenField, setChosenField] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      window.location.href = '/login';
    }

    let userId = JSON.parse(localStorage.getItem('userId'));
    let users = JSON.parse(localStorage.getItem('userData'));
    setUser(users.find(user => user.id === userId));
  }, []);

  const handleEdit = (e) => {
    setShowEditCard(false);
    setChosenField(e.target.id);
    setShowEditCard(true);
  }

  return (
    <>
      <Container fluid>
        <Row className="my-4">
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Profil
              </h4>
              <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{ maxHeight: "300px" }}>
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>Förnamn:</strong> {user.firstName}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon icon={faEdit} size="lg" id="Förnamn" onClick={handleEdit} />
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
                      <FontAwesomeIcon icon={faEdit} size="lg" id="Efternamn" onClick={handleEdit} />
                    </Col>
                  </Row>
                </li>
                <li className="list-group-item">
                  <Row>
                    <Col>
                      <p className="mb-0">
                        <strong>Email:</strong> {user.email}
                      </p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                      <FontAwesomeIcon icon={faEdit} size="lg" id="Email" onClick={handleEdit} />
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
                      <FontAwesomeIcon icon={faEdit} size="lg" id="Användarnamn" onClick={handleEdit} />
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
                      <FontAwesomeIcon icon={faEdit} size="lg" id="Lösenord" onClick={handleEdit} />
                    </Col>
                  </Row>
                </li>
              </ul>
            </Card>
            {showEditCard && (
              <EditCard
                field={chosenField}
              />
            )}
          </Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
        </Row>
      </Container>
    </>
  );
}