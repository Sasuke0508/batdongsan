import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreatePostPage from './CreatePostPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import PostDetailPage from './PostDetailPage';
import PostPage from './PostPage';
import PricingPlanPage from './PricingPlanPage';

function Pages(props) {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/post/:id' element={<PostDetailPage />} />
            <Route path='/post' element={<PostPage />} />
            <Route path='/manager-post/*' element={<CreatePostPage />} />
            <Route path='/pricing-plan' element={<PricingPlanPage />} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    );
}

export default Pages;