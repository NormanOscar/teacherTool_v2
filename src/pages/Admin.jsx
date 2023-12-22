import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { activities } from "../json/activities.json";
import AddNewStudent from "../components/AddNewStudent";
import AddNewUser from "../components/AddNewUser";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

export default function Admin() {
  const [newUser, setNewUser] = useState(false);
  const showNewUserModal = () => setNewUser(true);
  const hideNewUserModal = () => setNewUser(false);

  let users = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (localStorage.getItem('login')) {
      let userId = JSON.parse(localStorage.getItem('userId'));
      let user = users.find(user => user.id === userId);
      if (user.role !== "admin") {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  const removeUser = (e) => {
    let userId = e.currentTarget.id;
    let users = JSON.parse(localStorage.getItem('userData'));
    let userIndex = users.findIndex(user => user.id === userId);
    users.splice(userIndex, 1);

    localStorage.setItem('userData', JSON.stringify(users));

    window.location.reload(false);
  }
  
  return (
    <>
      <Container fluid>
        <Row className="my-4">
        <Col xs={12} md={3} style={{paddingTop: '2em'}}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Admin
              </h4>
              <p>Här kan du som admin lägga till nya elever, aktiviteter samt bedömngsmaterial.</p>
            </Card>
          </Col>
          <Col xs={12} md={3} style={{paddingTop: '2em'}}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Användare
              </h4>
              <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{ maxHeight: "300px" }}>
                {users && users.map((user, index) => {
                  return(
                    <li 
                      key={index}
                      className="list-group-item"
                    >
                      <Row>
                        <Col>
                          <p className="mb-0 d-flex justify-content-between">
                            {user.firstName + " " + user.lastName}
                          </p>
                          <p className="mb-0">{user.email}</p>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                          <FontAwesomeIcon icon={faTrash} size="lg" id={user.id} onClick={removeUser} />
                        </Col>
                      </Row>
                    </li>
                  )
                })}
              </ul>
              <Col className="d-flex justify-content-center mt-4 ">
                <button className="btn btn-primary w-50" onClick={showNewUserModal}>
                  Lägg till användare
                </button>
              </Col>
            </Card>
            { newUser && (
              <AddNewUser
                show={newUser}
                onClose={hideNewUserModal}
              />
            )}
          </Col>
          <Col xs={12} md={3} style={{paddingTop: '2em'}}>
            <AddNewStudent />
          </Col>
          <Col xs={12} md={3} style={{paddingTop: '2em'}}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Aktiviteter
              </h4>
              <ul className="list-group list-group-flush overflow-auto custom-scrollbar" style={{ maxHeight: "300px" }}>
                {activities.map((activity, index) => {
                  return(
                    <li 
                      key={index}
                      className="list-group-item"
                    >
                      <Row>
                        <Col>
                          <p className="mb-0 d-flex justify-content-between">
                            {activity.name}
                          </p>
                          <p className="mb-0">{activity.description}</p>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </Col>
                      </Row>
                    </li>
                  )
                })}
              </ul>
              <Col className="d-flex justify-content-center mt-4 ">
                <button className="btn btn-primary w-50">
                  Lägg till aktivitet
                </button>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}