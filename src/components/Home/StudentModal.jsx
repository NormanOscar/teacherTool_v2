import { Modal } from "react-bootstrap";

import StudentActivities from "../Student/StudentActivities";

export default function StudentModal({ show, student, onClose }) {
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {student.name + " ( " + student.class + ")"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentActivities
            student={student}
            onClose={onClose}
            page="studentModal"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
