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
        <p>Vill du verkligen avsluta interventionen?</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onClose}>Avbryt</button>
        <button type="button" className="btn btn-danger" onClick={onAccept}>Avsluta</button>
      </Modal.Footer>
    </Modal>
  );
}