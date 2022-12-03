import React from "react";
import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

function RequestModal(props) {
    const { open, onToggle } = props;
    return (
        <div className="request-modal">
            <Modal isOpen={open} toggle={onToggle}>
                <div className="p-3">
                    <ModalHeader toggle={onToggle}>Yêu cầu liên hệ</ModalHeader>
                    <ModalBody>
                        <div>Yêu cầu người đăng tin liên hệ theo thông tin dưới đây</div>
                        <Input className="mt-3" placeholder="Họ và tên" />
                        <Input className="mt-3" placeholder="Số điện thoại" />
                        <h6 className="mt-3">Lời nhắn</h6>
                        <Input type="textarea" value={"tôi quan tâm đến bất động sản này"} />
                        <Button color="danger" className="mt-5 w-100">
                            Gửi yêu cầu
                        </Button>
                    </ModalBody>
                </div>
            </Modal>
        </div>
    );
}

export default RequestModal;
