import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import useForm from '../../hooks/useForm';
import { accountService } from '../../services';
import { settingsDispatch } from '../../store/slices/settingsSlice';

function SignupView({ setViewMode, closeModal }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, onChange } = useForm({
        email: '',
        username: '',
        password: '',
        rePassword: ''
    });

    const handleRegister = async () => {
        try {
            await accountService.register(data);
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: `Link kích hoạt đã dược gửi tới email: ${data.email}`,
                })
            );
            setViewMode('login');
            dispatch(settingsDispatch.actSetLoginStatus(true));
            localStorage.setItem('find_room_login_status', true);
            navigate('/');
            closeModal?.();
        } catch(err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message,
                })
            );
        }
    }

    return (
        <div className='p-4'>
            <h6>Xin chào bạn</h6>
            <h5>Đăng ký tài khoản mới</h5>
            <Input 
                className="mt-3" 
                type="email" 
                placeholder="Nhập email"
                name="email"
                value={data.email}
                onChange={onChange}
            />
            <Input 
                className="mt-3" 
                placeholder="Nhập tên đăng nhập" 
                name="username"
                value={data.username}
                onChange={onChange}
            />
            <Input 
                className="mt-3" 
                type="password" 
                placeholder="Nhập mật khẩu" 
                name="password"
                value={data.password}
                onChange={onChange}
            />
            <Input 
                className="mt-3" 
                type="password" 
                placeholder="Nhập lại mật khẩu" 
                name="rePassword"
                value={data.rePassword}
                onChange={onChange}
            />
            <Button className='w-100 mt-3' primary="true" onClick={handleRegister}>Đăng ký</Button>
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
        </div>
    );
}

export default SignupView;