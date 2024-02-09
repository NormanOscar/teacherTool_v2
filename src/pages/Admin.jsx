import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

import StudentCards from "../components/Admin/Students/StudentCards";
import UsersCards from "../components/Admin/Users/UserCards";
import ActivityCards from "../components/Admin/Activities/ActivityCards";
import AdminEdit from "../components/Admin/AdminEdit";

export default function Admin() {
  const storedChosenCard = localStorage.getItem("chosenCard");
  const [chosenCard, setChosenCard] = useState(
    storedChosenCard ? parseInt(storedChosenCard) : 0
  );
  const [show, setShow] = useState(false);
  const [objectToShow, setObjectToShow] = useState({});
  const [editType, setEditType] = useState("");
  const setObject = (obj) => setObjectToShow(obj);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  let users = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (
      !localStorage.getItem("login") ||
      !localStorage.getItem("userId") ||
      !localStorage.getItem("studentData") ||
      !localStorage.getItem("userData") ||
      !localStorage.getItem("activityData")
    ) {
      window.location.href = "/login";
    } else {
      let userId = JSON.parse(localStorage.getItem("userId"));
      let user = users.find((user) => user.id === userId);
      if (user.role !== "admin") {
        window.location.href = "/";
      }
    }
  }, []);

  const handleCardSelection = (cardIndex) => {
    setChosenCard(cardIndex);
    localStorage.setItem("chosenCard", cardIndex.toString());
  };

  return (
    <>
      {show && (
        <AdminEdit
          editType={editType}
          editObj={objectToShow}
          show={show}
          onClose={hideModal}
        />
      )}
      <Container fluid>
        <Row className="my-4">
          <Col xs={12} md={2} style={{ paddingTop: "2em" }}>
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
                  className={`adminMenuItem ${
                    chosenCard === 0 ? "selectedAdminPage" : ""
                  }`}
                  onClick={() => handleCardSelection(0)}
                >
                  Användare
                </ListGroup.Item>
                <ListGroup.Item
                  className={`adminMenuItem ${
                    chosenCard === 1 ? "selectedAdminPage" : ""
                  }`}
                  onClick={() => handleCardSelection(1)}
                >
                  Elever
                </ListGroup.Item>
                <ListGroup.Item
                  className={`adminMenuItem ${
                    chosenCard === 2 ? "selectedAdminPage" : ""
                  }`}
                  onClick={() => handleCardSelection(2)}
                >
                  Aktiviteter
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col xs={12} md={10} style={{ paddingTop: "2em" }}>
            {chosenCard === 0 ? (
              <UsersCards
                showModal={showModal}
                setObject={setObject}
                setEditType={setEditType}
              />
            ) : chosenCard === 1 ? (
              <StudentCards
                showModal={showModal}
                setObject={setObject}
                setEditType={setEditType}
              />
            ) : (
              <ActivityCards
                showModal={showModal}
                setObject={setObject}
                setEditType={setEditType}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
