import { Col, Row } from "react-bootstrap";

import AddStudent from "./AddStudent";
import StudentList from "./StudentList";

export default function StudentCards({ showModal, setObject, setEditType }) {

  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <StudentList showModal={showModal} setObject={setObject} setEditType={setEditType} />
        </Col>
        <Col xs={12} md={6}>
          <AddStudent />
        </Col>
      </Row>
    </>
  );
}