import React, { useContext, useState } from "react";
import { Facebook, Google } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { authService } from "../../services";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import { tokenDispatch } from '../../store/slices/tokenSlice';
import { LoginContext } from "../../context";

function LoginView({ setViewMode, onToggle }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // only login modal
    const loginContext = useContext(LoginContext);

    const [ user, setUser ] = useState({
        username: '',
        password: ''
    });

    const handleInputForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleLogin = async () => {
        try {
            const { data } = await authService.login(user);
            const systemUser = data?.userInfo?.systemUser;
            if (systemUser?.address) {
                const address = systemUser.address;
                systemUser.address = {
                    id: address.id,
                    addressDetail: address.addressDetail,
                    ward: address.wardId,
                    city: address.provinceId,
                    district: address.districtId,
                }
            }
            dispatch(
                tokenDispatch.setToken({
                    ...data.userInfo,
                    accessToken: data.accessToken
                })
            );

            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: 'Login successful'
                })
            );

            navigate('/');
            loginContext?.onToggle();
        } catch(err) {
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
            <h5>Đăng nhập</h5>
            <Input 
                className="mt-3" 
                placeholder="Nhập tên đăng nhập"
                name="username"
                onChange={handleInputForm}
            />
            <Input 
                className="mt-3" 
                type="password" 
                placeholder="Nhập mật khẩu" 
                name="password"
                onChange={handleInputForm}
            />
            <Button className="w-100 mt-3" primary="true" onClick={handleLogin}>
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
