import { Col, Row } from "react-bootstrap";

import AddStudent from "./AddStudent";
import StudentList from "./StudentList";

export default function UsersCard() {

  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <AddStudent />
        </Col>
        <Col xs={12} md={6}>
          <StudentList />
        </Col>
      </Row>
    </>
  );
}