import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";

function ConfirmationModal({ open, onToggle, onConfirm, content }) {
    return (
        <Modal centered isOpen={open} toggle={onToggle}>
            <div className="p-3">
                <ModalHeader toggle={onToggle}>{ content.header }</ModalHeader>
                <ModalBody>
                    <div>{ content.body }</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onConfirm}>Xác nhận</Button>
                    <Button onClick={onToggle}>Hủy bỏ</Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

export default ConfirmationModal;