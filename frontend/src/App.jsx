import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MonitoringPage from "./pages/MonitoringPage";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthorizedRoute from "./components/AuthorizedRoute";
import FillSchoolPage from "./pages/FillSchoolPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={
            <AuthorizedRoute>
              <HomePage />
            </AuthorizedRoute>
          } />
          <Route path="/login" element={
            <AuthorizedRoute>
              <LoginPage />
            </AuthorizedRoute>
          } />
          <Route path="/signup" element={
            <AuthorizedRoute>
              <RegisterPage />
            </AuthorizedRoute>
          } />
          <Route path="/fillschool" element={
            <AuthorizedRoute>
              <FillSchoolPage />
            </AuthorizedRoute>
          } />
          <Route path="*" element={<Page404 />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/monitoring/:id"
            element={
              <ProtectedRoute>
                <MonitoringPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
