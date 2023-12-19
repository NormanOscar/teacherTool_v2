import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Admin() {

  useEffect(() => {
    if (localStorage.getItem('login')) {
      if (JSON.parse(localStorage.getItem('user')).username !== "admin") {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
        <Col xs={12} md={4} style={{paddingTop: '2em'}}>
          <Card className="p-4 my-2">
            <h4 className="mb-4" style={{ textAlign: "center" }}>
              Admin
            </h4>
          </Card>
        </Col>
        <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
      </Row>
    </Container>
  );
}