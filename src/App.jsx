import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutLoader } from "./components";
import { ThemeProvider } from "./context/themeContext";
import ProtectedRoute from "./components/ProtectedRoute";
const HomePage = lazy(() => import("./pages/HomePage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExists, userNotExists } from "./redux/features/auth/authSlice";
import { server } from "./config/config";
import { SocketProvider } from "./context/socketContext";

const App = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [mode, setMode] = useState("dark");
  const dispatch = useDispatch();

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.querySelector("body").classList.remove("light", "dark");
    document.querySelector("body").classList.add(mode);
  }, [mode]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/me`, {
        withCredentials: true,
      });
      dispatch(userExists(data.user));
    } catch (error) {
      dispatch(userNotExists());
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <ThemeProvider value={{ mode, toggleMode }}>
          <Routes>
            <Route
              element={
                <SocketProvider>
                  <ProtectedRoute user={user} />
                </SocketProvider>
              }
            >
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/chat/:chatId" element={<ChatPage />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <SignupPage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/auth/change-password"
              element={
                <ProtectedRoute user={!user} redirect="/">
                  <ChangePasswordPage />
                </ProtectedRoute>
              }
            /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </Suspense>
      <Toaster position="bottom-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
