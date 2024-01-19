import { Modal } from "react-bootstrap";

import StudentActivities from "../Assessment/StudentActivities";

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
            page="studentModal"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
