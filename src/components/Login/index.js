import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import ChangePassword from './ChangePassword';
import ForgotPasswordView from './ForgotPasswordView';
import LoginView from './LoginView';
import SignupView from './SignupView';

function Login({initMode, route, closeModal}) {
    const location = useLocation();
    const [viewMode, setViewMode] = useState( location?.state?.initMode || initMode || 'login')
    return (
        <div className='login container-sm'>
            <Row>
                <Col md={5}>
                    <img alt="login" src="https://batdongsan.com.vn/sellernet/static/media/cover.800e56db.png" />
                </Col>
                <Col md={7}>
                    {viewMode === 'login' &&
                        <LoginView closeModal={closeModal} setViewMode={setViewMode} />}
                    {viewMode === 'signup' &&
                        <SignupView closeModal={closeModal} setViewMode={setViewMode} />}
                    {viewMode === 'forgot' &&
                        <ForgotPasswordView setViewMode={setViewMode} />}
                    {viewMode === 'changePassword' &&
                        <ChangePassword setViewMode={setViewMode} />}
                </Col>
            </Row>
        </div>
    );
}

export default Login;