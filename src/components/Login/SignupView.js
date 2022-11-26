import React from 'react';
import { Phone } from 'react-bootstrap-icons';
import { Button, Input } from 'reactstrap';

function SignupView({ setViewMode }) {
    return (
        <div className='p-4'>
            <h6>Xin chào bạn</h6>
            <h5>Đăng ký tài khoản mới</h5>
            <Input className="mt-3" type="email" placeholder="Nhập email" />
            <div className='d-flex align-items-center mt-3'>
                <Button disabled>
                    <Phone />
                </Button>
                <Input type="number" placeholder="Nhập số điện thoại" />
            </div>
            <Input className="mt-3" type="password" placeholder="Nhập mật khẩu" />
            <Input className="mt-3" type="password" placeholder="Nhập lại mật khẩu" />
            <Button className='w-100 mt-3' primary>Tiếp tục</Button>
            <p className='mt-3'>
                Bằng việc tiếp tục, bạn đồng ý với{" "}
                <a color='info' href="#">Điều khoản sử dụng</a>{" "}
                của chúng tôi
            </p>
        </div>
    );
}

export default SignupView;