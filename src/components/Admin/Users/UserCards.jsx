import { Col, Row } from "react-bootstrap";

import AddUser from "./AddUser";
import UserList from "./UserList";

export default function UsersCards({ showModal, setObject, setEditType }) {

  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <UserList showModal={showModal} setObject={setObject} setEditType={setEditType} />
        </Col>
        <Col xs={12} md={6}>
          <AddUser />
        </Col>
      </Row>
    </>
  );
}
