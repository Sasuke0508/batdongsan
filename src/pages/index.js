import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/core/PrivateRoute";
import CreatePostPage from "./CreatePostPage";
import ForgotPassword from "./ForgotPasswordPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PostDetailPage from "./PostDetailPage";
import PostPage from "./PostPage";
import PostSavedPage from "./PostSavedPage";
import PricingPlanPage from "./PricingPlanPage";
import UserSettingsPage from "./UserSettingsPage";

function Pages(props) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/post/saved" element={ <PrivateRoute component={PostSavedPage} /> } />
            <Route path="/post" element={<PostPage />} />
            <Route path="/manager-post/*" element={ <PrivateRoute component={CreatePostPage} /> } />
            <Route path="/pricing-plan" element={<PricingPlanPage />} />
            <Route path="/user-settings" element={ <PrivateRoute component={UserSettingsPage} /> } />
            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
}

export default Pages;
