import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

import AutoComplete from "../components/Home/AutoComplete";
import CurrentActivities from "../components/Home/CurrentActivities";
import FlaggedStudents from "../components/Home/FlaggedStudents";
import { checkLoginAndData } from "../components/func";

export default function Home() {
  const [name, setName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(JSON.parse(localStorage.getItem("studentData")));
  }, []);

  function changeInputText(newValue) {
    setName(newValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      let student = students.filter(
        (student) => student.name + " (" + student.class + ")" === name
      );
      if (student.length > 0) {
        localStorage.setItem("studentId", JSON.stringify(student[0].id));
        window.location.href = "/student";
      } else {
        setInputError(true);
      }
    } else {
      setInputError(true);
    }
  };
  return (
    <>
      <Container fluid>
        <Row className="my-4">
          <Col xs={12} md={4} style={{ paddingTop: "2em" }}>
            <CurrentActivities />
          </Col>
          <Col xs={12} md={4} style={{ paddingTop: "2em" }}>
            <Card className="p-3 my-2">
              <div className="d-flex justify-content-center main-div">
                <form id="form-block">
                  <h2 className="mb-4" style={{ textAlign: "center" }}>
                    Hämta elev
                  </h2>
                  {inputError && (
                    <div className="alert alert-danger" role="alert">
                      Eleven finns ej
                    </div>
                  )}
                  <div className="form-outline mb-4">
                    <p style={{ margin: 0 }}>
                      Elevens namn: <span className="required-symbol">*</span>
                    </p>
                    <AutoComplete change={changeInputText} />
                  </div>

                  <button
                    className="btn btn-primary btn-block w-100 mb-2 submitBtn"
                    onClick={handleSubmit}
                  >
                    Sök
                  </button>
                </form>
              </div>
            </Card>
          </Col>
          <Col xs={12} md={4} style={{ paddingTop: "2em" }}>
            <FlaggedStudents />
          </Col>
        </Row>
      </Container>
    </>
  );
}
