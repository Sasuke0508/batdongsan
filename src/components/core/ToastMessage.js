import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "reactstrap";
import { settingsDispatch } from "../../store/slices/settingsSlice";

function ToastMessage(props) {
    const toastMsg = useSelector((state) => state.settingsSlice.toastMsg);
    const { open, content, error } = toastMsg;
    const dispatch = useDispatch();
    const closeToast = () => {
        dispatch(
            settingsDispatch.actSetToastMessage({
                open: false,
                content: "",
                error: false,
            })
        );
    };
    useEffect(() => {
        let timeout;
        if (open) {
            timeout = setTimeout(() => {
                closeToast();
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
            if (open) {
                closeToast();
            }
        };
    }, [open]);
    return (
        <div>
            <Toast isOpen={open} fade className={`p-2 rounded ${error ? 'toast--error' : ''}`}>
                {content}
            </Toast>
        </div>
    );
}

export default ToastMessage;
