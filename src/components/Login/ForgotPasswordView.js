import React from "react";
import { Button, Input } from "reactstrap";

function ForgotPasswordView({setViewMode}) {
    return (
        <div className="p-4">
            <h6>Xin chào bạn</h6>
            <h5>Quên mật khẩu</h5>
            <Input className="mt-3" type="email" placeholder="Nhập email" />
            <Button className="w-100 mt-3" primary>
                Xác nhận
            </Button>
            <p className="mt-3">
                Chưa có tài khoản?{" "}
                <a color="info" href="#" onClick={() => setViewMode("signup")}>
                    Đăng kí
                </a>{" "}
            </p>
        </div>
    );
}

export default ForgotPasswordView;
