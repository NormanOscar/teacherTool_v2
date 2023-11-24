import Modal from "react-bootstrap/Modal";

export default function ConfirmationModal({ show, closeModal, onDeny }) {

  function onAccept () {
    closeModal();
    onDeny();
  }

  function onClose () {
    closeModal();

  }

  return (
    <Modal dialogClassName="confirmationModal" show={show} onHide={onClose} centered>
      <Modal.Body>
        <p>Vill du verkligen avsluta aktiviteten?</p>
        <div 
          className="col border-0 rounded-1" style={{
            padding: "1em",
            margin: "1em 0 1em 0",
            backgroundColor: "#ededed",
          }}>
          <div className="row my-3">
            <div className="form-outline">
              <label htmlFor="comment">Kommentar:</label>
              <textarea
                className="form-control border border-2 form-text"
                rows="4"
                id="comment"
                style={{ resize: "none" }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Avbryt</button>
        <button type="button" className="btn btn-danger" onClick={onAccept}>Avsluta</button>
      </Modal.Footer>
    </Modal>
  );
}