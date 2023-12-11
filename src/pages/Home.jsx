import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import studentList from "../json/studentList.json";
import AutoComplete from "../components/AutoComplete";
import CurrentActivities from "../components/CurrentActivities";
import { addStudentsToLocalStorage } from "../components/func";

export default function Home() {
  const [name, setName] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    addStudentsToLocalStorage();
  }, []);

  function changeInputText(newValue) {
    setName(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      let student = studentList.students.filter(
        (student) => student.name + " (åk. " + student.grade + ")" === name
      );
      if (student.length > 0) {
        localStorage.setItem("studentId", JSON.stringify(student[0].id));
        navigate("/assessment");
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
        <Row className="my-2">
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}>
            <div className="d-flex justify-content-center main-div">
              <form id="form-block">
                <h1 className="mb-4" style={{ textAlign: "center" }}>
                  Hämta elev
                </h1>
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
            <CurrentActivities />
          </Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
        </Row>
      </Container>
    </>
  );
}
