import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "reactstrap";
import Login from  '../Login'
import { LoginContext } from '../../context';


const LoginModal = forwardRef(({ initMode }, ref) => {
    useImperativeHandle(ref, () => {
        return {
            onToggle: onToggle
        }
    }, []);

    const [open, setOpen] = useState(false);

    const onToggle = () => {
        setOpen(!open);
    }

    return (
        <LoginContext.Provider value={{open, onToggle}}>
            <div className="request-modal">
                <Modal centered size="lg" isOpen={open} toggle={onToggle}>
                    <Login initMode={initMode} closeModal={() => onToggle(false)}/>
                </Modal>
            </div>
        </LoginContext.Provider>
    );
})

export default LoginModal;
