import React from "react";
import { Facebook, Google, Phone } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, Input } from "reactstrap";
import { settingsDispatch } from "../../store/slices/settingsSlice";

function LoginView({ setViewMode, closeModal }) {
    const dispatch = useDispatch()
    const handleClickLogin = () => {
        dispatch(settingsDispatch.actSetLoginStatus(true))
        closeModal()
    }
    return (
        <div className="p-4">
            <h6>Xin chào bạn</h6>
            <h5>Đăng nhập</h5>
            <Input className="mt-3" type="email" placeholder="Nhập email" />
            <Input className="mt-3" type="password" placeholder="Nhập mật khẩu" />
            <Button className="w-100 mt-3" primary onClick={handleClickLogin}>
                Đăng nhập
            </Button>
            <div className="mt-3">
                <a color="info" href="#" onClick={() => setViewMode("forgot")}>
                    Quên mật khẩu
                </a>
            </div>
            <div className="mt-1">
                Chưa có tài khoản?{" "}
                <a color="info" href="#" onClick={() => setViewMode("signup")}>
                    Đăng kí
                </a>
            </div>
            <hr />
            <div className="text-center">Hoặc đăng nhập bằng</div>
            <div className="d-flex justify-content-center mt-3 pb-2">
                <Button className="d-flex align-items-center me-2" outline>
                    <Facebook className="me-2" />
                    Facebook
                </Button>
                <Button className="d-flex align-items-center" outline>
                    <Google className="me-2" />
                    Google
                </Button>
            </div>
        </div>
    );
}

export default LoginView;
