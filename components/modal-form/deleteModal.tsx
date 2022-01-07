import { Modal, Button } from "react-bootstrap";
import styles from "../../styles/deleteModal.module.css"

const DeleteModal = ({onConfirm, onCancel, show, itemId}:any) => {
    return (<Modal
      size="sm"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.delModal}
    >
      <Modal.Header closeButton onClick={onCancel}>
        <Modal.Title id="contained-modal-title-vcenter">
            Delete Entry
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
            Are you sure you want to delete this entry?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={() => onConfirm(itemId)}>Confirm</Button>
      </Modal.Footer>
    </Modal>);
}

export default DeleteModal;