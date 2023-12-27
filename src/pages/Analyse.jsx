import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';

export default function Analyse() {
  let student = null;

  useEffect(() => {
    if (!localStorage.getItem('login')) {
      window.location.href = '/login';
    }

    let studentId = JSON.parse(localStorage.getItem('studentId'));
    let students = JSON.parse(localStorage.getItem('studentData'));
    student = students.find((student) => student.id === studentId);
  }, []);
  return (
    <>
      <Container fluid>
        <Row className="my-4">
          <Col xs={12} md={4} style={{paddingTop: '2em'}}>
            <Card className="p-4 my-2">
              <h4 className="mb-4" style={{ textAlign: "center" }}>
                Analys
              </h4>
            </Card>
          </Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
          <Col xs={12} md={4} style={{paddingTop: '2em'}}></Col>
        </Row>
      </Container>
    </>
  );
};