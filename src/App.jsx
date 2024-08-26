import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout, LayoutLoader } from "./components";
import { ThemeProvider } from "./context/themeContext";
const ChatPage = lazy(() => import("./pages/ChatPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const ChatContainer = lazy(() => import("./components/chat/ChatContainer"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExists, userNotExists } from "./redux/features/auth/authSlice";
import { backend_url } from "./config/config";
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
      const { data } = await axios.get(`${backend_url}/api/v1/user/me`, {
        withCredentials: true,
      });
      dispatch(userExists(data.user));
    } catch (error) {
      dispatch(userNotExists());
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <ThemeProvider value={{ mode, toggleMode }}>
          <Routes>
            <Route
              path="/"
              element={
                <SocketProvider user={user}>
                  <ProtectedRoute user={user} isLoading={isLoading}>
                    <Layout />
                  </ProtectedRoute>
                </SocketProvider>
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute user={user} isLoading={isLoading}>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/groups"
                element={
                  <ProtectedRoute user={user} isLoading={isLoading}>
                    <GroupPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat/:chatId"
                element={
                  <ProtectedRoute user={user} isLoading={isLoading}>
                    <ChatContainer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/group/:chatId"
                element={
                  <ProtectedRoute user={user} isLoading={isLoading}>
                    <ChatContainer />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute user={!user} isLoading={isLoading} redirect="/">
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute user={!user} isLoading={isLoading} redirect="/">
                  <SignupPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </Suspense>
      <Toaster position="bottom-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
