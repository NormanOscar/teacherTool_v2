import { Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrash, faPen);

export default function AddUser() {
  let users = JSON.parse(localStorage.getItem("userData"));

  const removeUser = (e) => {
    let userId = e.currentTarget.id;
    let userIndex = users.findIndex((user) => user.id === userId);
    users.splice(userIndex, 1);

    localStorage.setItem("userData", JSON.stringify(users));

    window.location.reload(false);
  };
  return(
    <Card className="p-4 my-2">
      <h4 className="mb-4" style={{ textAlign: "center" }}>
        Användare
      </h4>
      <ul
        className="list-group list-group-flush overflow-auto custom-scrollbar"
        style={{ maxHeight: "400px" }}
      >
        {users &&
          users.map((user, index) => {
            return (
              <li key={index} className="list-group-item">
                <Row>
                  <Col>
                    <p className="mb-0 d-flex justify-content-between">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="mb-0">{user.email}</p>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    <FontAwesomeIcon
                      icon={faPen}
                      size="lg"
                      id={user.id}
                      className="icons"
                    />
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      color="red"
                      id={user.id}
                      className="icons"
                      onClick={removeUser}
                    />
                  </Col>
                </Row>
              </li>
            );
          })}
      </ul>
    </Card>
  )
}