import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LayoutLoader, ChatContainer } from "./components";
import { ThemeProvider } from "./context/themeContext";
const Layout = lazy(() => import("./components/Layout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.querySelector("body").classList.remove("light", "dark");
    document.querySelector("body").classList.add(mode);
  }, [mode]);

  return (
    <Suspense fallback={<LayoutLoader />}>
      <ThemeProvider value={{ mode, toggleMode }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:chatId" element={<ChatContainer />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/auth/change-password"
            element={<ChangePasswordPage />}
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
