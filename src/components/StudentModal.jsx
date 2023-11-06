import Modal from "react-bootstrap/Modal";

export default function StudentModal({ show, student, onClose, onInterventionClick }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{student.name + ' (åk. ' + student.grade + ')'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex-column align-items-center" key={student.id}>
          <ul className="list-group list-group-flush">
            {student.interventions.map((intervention) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={intervention.id}
              >
                <p className="mb-0">
                  <span className="align-middle" style={{ fontWeight: "bold" }}>
                    {intervention.name}
                  </span>
                  <small className="align-middle" style={{ color: "grey" }}>
                    &nbsp;{intervention.date}
                  </small>
                </p>
                <div>
                  <button
                    type="button"
                    className="btn btn-success btn-sm mx-2"
                    value={intervention.id}
                    onClick={onInterventionClick}
                  >
                    Avstämning
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}