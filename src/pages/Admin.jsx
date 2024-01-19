import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

import StudentCards from "../components/Admin/Students/StudentCards";
import UsersCard from "../components/Admin/Users/UserCards";
import ActivityCards from "../components/Admin/Activities/ActivityCards";

export default function Admin() {
  const [chosenCard, setChosenCard] = useState(2);
  let users = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (localStorage.getItem("login")) {
      let userId = JSON.parse(localStorage.getItem("userId"));
      let user = users.find((user) => user.id === userId);
      if (user.role !== "admin") {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="my-4">
          <Col xs={12} md={3} style={{ paddingTop: "2em" }}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Admin
              </h4>
              <p className="text-center">
                Här kan du som admin lägga till nya elever, aktiviteter samt
                bedömngsmaterial.
              </p>
              <ListGroup style={{ border: 0 }}>
                <ListGroup.Item
                  className="adminMenuItem"
                  onClick={() => {
                    setChosenCard(0);
                  }}
                >
                  Användare
                </ListGroup.Item>
                <ListGroup.Item
                  className="adminMenuItem"
                  onClick={() => {
                    setChosenCard(1);
                  }}
                >
                  Elever
                </ListGroup.Item>
                <ListGroup.Item
                  className="adminMenuItem"
                  onClick={() => {
                    setChosenCard(2);
                  }}
                >
                  Aktiviteter
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col xs={12} md={9} style={{ paddingTop: "2em" }}>
            {chosenCard === 0 ? (
              <UsersCard />
            ) : chosenCard === 1 ? (
              <StudentCards />
            ) : (
              <ActivityCards />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}