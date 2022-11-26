import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import LoginView from './LoginView';
import SignupView from './SignupView';

function Login(props) {
    const [viewMode, setViewMode] = useState('login')
    return (
        <div className='login container-sm'>
            <Row>
                <Col md={5}>
                    <img alt="login" src="https://batdongsan.com.vn/sellernet/static/media/cover.800e56db.png" />
                </Col>
                <Col md={7}>
                    {viewMode === 'login' &&
                        <LoginView setViewMode={setViewMode} />}
                    {viewMode === 'signup' &&
                        <SignupView setViewMode={setViewMode} />}
                </Col>
            </Row>
        </div>
    );
}

export default Login;