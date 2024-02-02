import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { addUsersToLocalStorage } from "../components/func";

export default function Login() {
  const [inputResult, setInputResult] = useState({ msg: null, type: null });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    addUsersToLocalStorage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === "") {
      setInputResult({ msg: "Användarnamn saknas", type: "danger" });
    } else if (password === "") {
      setInputResult({ msg: "Lösenord saknas", type: "danger" });
    }

    checkUser();
  };

  const checkUser = () => {
    let users = JSON.parse(localStorage.getItem("userData"));
    let user = users.find((user) => user.username === username || user.email === username);
    if (user) {
      if (user.password === password) {
        localStorage.setItem("login", true);
        localStorage.setItem("userId", JSON.stringify(user.id));
        window.location.href = "/";
      } else {
        setInputResult({ msg: "Fel lösenord", type: "danger" });
      }
    } else {
      setInputResult({ msg: "Användaren finns inte", type: "danger" });
    }
  }

  return (
    <>
      <Container fluid>
      <Row className="my-4">
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}>
            <Card className="p-3 my-2">
              <div className="d-flex justify-content-center main-div">
                <form id="form-block">
                  <h2 className="mb-4" style={{ textAlign: "center" }}>
                    Logga in
                  </h2>
                  {inputResult.msg !== null && (
                    <div className="alert alert-danger" role="alert">
                      {inputResult.msg}
                    </div>
                  )}
                  <div className="form-outline mb-4">
                    <label style={{ margin: 0 }}>
                      Användarnamn: <span className="required-symbol">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label style={{ margin: 0 }}>
                      Lösenord: <span className="required-symbol">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-block w-100 mb-2 submitBtn"
                    onClick={handleSubmit}
                  >
                    Logga in
                  </button>
                </form>
              </div>
            </Card>
          </Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
        </Row>
      </Container>
    </>
  );
}