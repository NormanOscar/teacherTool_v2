import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import StudentActivities from "./StudentActivities";

export default function StudentModal({ show, student, onClose }) {

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {student.name + " (åk. " + student.grade + ")"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentActivities
            student={student}
            onClose={onClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
