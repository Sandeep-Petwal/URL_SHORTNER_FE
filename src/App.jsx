import { useState } from 'react'
import React,  { StrictMode } from 'react'

import './App.css'

function App() {

  return (
   <>
   <h1 className='text-3xl font-bold underline'>Hello World</h1>
   </>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './store/slices/authSlice';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import VerifyPage from './pages/auth/VerifyPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UrlAnalyticsPage from './pages/dashboard/UrlAnalyticsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import RedirectPage from './pages/RedirectPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          
          {/* Auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="verify" element={<VerifyPage />} />
          </Route>
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="analytics/:shortCode" element={<UrlAnalyticsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          {/* URL Redirection */}
          <Route path="/:shortCode" element={<RedirectPage />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
