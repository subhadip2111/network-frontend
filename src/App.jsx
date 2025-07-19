import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import NetworkApp from './components/layout/FeedLayout';
import LandingPage from './components/layout/LandingLayout';
import Login from './components/pages/Auth/Login';
import VerifyOtp from './components/pages/Auth/VerifyOtp';
import ExplorePage from './components/layout/Explorelayout';
import Explore from './components/explore/Explore';
import JoinCommunitySection from './components/communities/JoinCommunitySection';
import PostsRoute from './components/pages/post/PostsRoute';
import CreatePost from './components/pages/post/CreatePost';
import Profile from './components/pages/profile/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <LandingPage />
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route
        path="/home/*"
        element={
          <ProtectedRoute>
            <NetworkApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/join-community"
        element={
          <ProtectedRoute>
            <JoinCommunitySection />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
