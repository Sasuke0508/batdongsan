import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import PostPage from './PostPage';

function Pages(props) {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    );
}

export default Pages;