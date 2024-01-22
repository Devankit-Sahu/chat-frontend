import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const Layout = lazy(() => import("./components/layout/Layout"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<ChatPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth/change-password" element={<ChangePasswordPage />} />
    </Routes>
  );
};

export default App;
