import React, { lazy, Suspense } from "react";
import { Route, Router, Routes } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const Layout = lazy(() => import("./components/layout/Layout"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<ChatPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/auth/change-password"
            element={<ChangePasswordPage />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
