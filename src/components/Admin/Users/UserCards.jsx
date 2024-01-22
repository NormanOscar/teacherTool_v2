import { Col, Row } from "react-bootstrap";

import AddUser from "./AddUser";
import UserList from "./UserList";

export default function UsersCard() {

  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <UserList />
        </Col>
        <Col xs={12} md={6}>
          <AddUser />
        </Col>
      </Row>
    </>
  );
}
