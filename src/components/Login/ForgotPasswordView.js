import React from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "reactstrap";
import useFormInput from "../../hooks/useFormInput";
import { accountService } from "../../services";
import { settingsDispatch } from "../../store/slices/settingsSlice";

function ForgotPasswordView({setViewMode}) {

    const dispatch = useDispatch();

    const email = useFormInput('');

    const handleSendMail = async () => {
        try {
            await accountService.verifyEmail(email.value);
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: `Đã gửi đến ${email.value}`
                })
            );
            setViewMode('login');
        } catch (err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message
                })
            )
        }
    }

    return (
        <div className="p-4">
            <h6>Xin chào bạn</h6>
            <h5>Quên mật khẩu</h5>
            <Input 
                className="mt-3"
                type="email" placeholder="Nhập email" 
                {...email}
            />
            <Button className="w-100 mt-3" primary="true" onClick={handleSendMail}>
                Xác nhận
            </Button>
            <p className="mt-3">
                Chưa có tài khoản?{" "}
                <a color="info" href="#" onClick={() => setViewMode("signup")}>
                    Đăng kí
                </a>
            </p>
        </div>
    );
}

export default ForgotPasswordView;
