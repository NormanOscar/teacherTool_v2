import { Col, Row } from "react-bootstrap";

import AddActivity from "./AddActivity";
import ActivityList from "./ActivityList";

export default function UsersCard() {
  return (
    <>
      <Row>
        <Col xs={12} md={6}>
          <ActivityList />
        </Col>
        <Col xs={12} md={6}>
          <AddActivity />
        </Col>
      </Row>
    </>
  );
}