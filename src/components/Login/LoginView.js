import React from 'react';
import { Phone } from 'react-bootstrap-icons';
import { Button, Input } from 'reactstrap';

function LoginView({ setViewMode }) {
    return (
        <div className='p-4'>
            <h6>Xin chào bạn</h6>
            <h5>Đăng nhập</h5>
            <Input className="mt-3" type="email" placeholder="Nhập email" />
            <Input className="mt-3" type="password" placeholder="Nhập mật khẩu" />
            <Button className='w-100 mt-3' primary>Đăng nhập</Button>
            <p className='mt-3'>
                Chưa có tài khoản?{" "}
                <a color='info' href="#" onClick={() => setViewMode('signup')}>Đăng kí</a>{" "}
            </p>
        </div>
    );
}

export default LoginView;