import React from "react";
import { Modal } from "reactstrap";
import Login from  '../Login'
function LoginModal(props) {
    const { open, onToggle, initMode } = props;
    return (
        <div className="request-modal">
            <Modal centered size="lg" isOpen={open} toggle={onToggle}>
                <Login initMode={initMode} />
            </Modal>
        </div>
    );
}

export default LoginModal;
