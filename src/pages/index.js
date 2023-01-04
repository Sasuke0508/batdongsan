import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePostPage from "./CreatePostPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PostDetailPage from "./PostDetailPage";
import PostPage from "./PostPage";
import PostSavedPage from "./PostSavedPage";
import PricingPlanPage from "./PricingPlanPage";
import UserSettingsPage from "./UserSettingsPage";
import PrivateRoute from '../components/core/PrivateRoute';

function Pages(props) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/post/saved" element={<PostSavedPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/manager-post/*" element={ <PrivateRoute component={CreatePostPage} />} />
            <Route path="/pricing-plan" element={<PricingPlanPage />} />
            <Route path="/user-settings" element={ <PrivateRoute component={UserSettingsPage} /> } />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
}

export default Pages;
