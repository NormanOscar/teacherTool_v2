import { Col, Row } from "react-bootstrap";

import AddActivity from "./AddActivity";
import ActivityList from "./ActivityList";

export default function ActivityCards({ showModal, setObject, setEditType }) {
  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <ActivityList showModal={showModal} setObject={setObject} setEditType={setEditType} />
        </Col>
        <Col xs={12} md={6}>
          <AddActivity />
        </Col>
      </Row>
    </>
  );
}