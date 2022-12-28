import React from 'react';
import { Phone } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'reactstrap';
import { settingsDispatch } from '../../store/slices/settingsSlice';

function SignupView({ setViewMode, closeModal }) {
    const dispatch = useDispatch()
    const handleClickLogin = () => {
        dispatch(settingsDispatch.actSetLoginStatus(true))
        closeModal()
    }
    return (
        <div className='p-4'>
            <h6>Xin chào bạn</h6>
            <h5>Đăng ký tài khoản mới</h5>
            <Input className="mt-3" type="email" placeholder="Nhập email" />
            <div className='d-flex align-items-center mt-3'>
                <Button disabled>
                    <Phone />
                </Button>
                <Input placeholder="Nhập số điện thoại" />
            </div>
            <Input className="mt-3" type="password" placeholder="Nhập mật khẩu" />
            <Input className="mt-3" type="password" placeholder="Nhập lại mật khẩu" />
            <Button className='w-100 mt-3' primary onClick={handleClickLogin}>Tiếp tục</Button>
            <p className='mt-3'>
                Bằng việc tiếp tục, bạn đồng ý với{" "}
                <a color='info' href="#">Điều khoản sử dụng</a>{" "}
                của chúng tôi
            </p>
            <p className='mt-3'>
                Đã có tài khoản?{" "}
                <a color='info' href="#" onClick={() => setViewMode('login')}>Đăng nhập</a>{" "}
            </p>
        </div>
    );
}

export default SignupView;