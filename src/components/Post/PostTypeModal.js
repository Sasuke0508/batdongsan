import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PostTypeList from './PostTypeList';

function PostTypeModal({open, onToggle, onConfirm, type}) {
    const [postPlan, setPostPlan] = useState(type);

    return (
        <Modal size="lg" centered isOpen={open} toggle={onToggle}>
            <ModalHeader>Danh sách gói tin</ModalHeader>
            <ModalBody>
                <PostTypeList 
                    setPostPlan={setPostPlan}
                    postPlan={postPlan}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => onConfirm(postPlan)}>Thanh toán và gia hạn</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PostTypeModal;