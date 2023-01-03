import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { settingsDispatch } from "../../store/slices/settingsSlice";

function SignupView({ setViewMode, closeModal }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleClickLogin = (e) => {
        e.preventDefault()
        dispatch(settingsDispatch.actSetLoginStatus(true));
        localStorage.setItem('find_room_login_status', true)
        navigate('/')
        closeModal();
    };
    return (
        <form className="p-4">
            <h6>Xin chào bạn</h6>
            <h5>Đăng ký tài khoản mới</h5>
            <Input className="mt-3" type="email" placeholder="Nhập email" />
            <Input className="mt-3" placeholder="Họ tên" />
            <Input className="mt-3" placeholder="Tên đăng nhập" />
            <Input className="mt-3" type="password" placeholder="Nhập mật khẩu" />
            <Input className="mt-3" type="password" placeholder="Nhập lại mật khẩu" />
            <Button type="submit" className="w-100 mt-3" primary onClick={handleClickLogin}>
                Tiếp tục
            </Button>
            <p className="mt-3">
                Bằng việc tiếp tục, bạn đồng ý với{" "}
                <a color="info" href="#">
                    Điều khoản sử dụng
                </a>{" "}
                của chúng tôi
            </p>
            <p className="mt-3">
                Đã có tài khoản?{" "}
                <a color="info" href="#" onClick={() => setViewMode("login")}>
                    Đăng nhập
                </a>{" "}
            </p>
        </form>
    );
}

export default SignupView;
