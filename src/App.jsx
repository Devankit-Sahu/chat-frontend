import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import ChatPage from "./pages/ChatPage";
import GroupPage from "./pages/GroupPage";
import { GroupChatContainer, Layout } from "./components";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ChatPage />,
      },
      {
        path: "group",
        element: <GroupPage />,
        children: [
          {
            path: ":id",
            element: <GroupChatContainer />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/auth/change-password",
    element: <ChangePasswordPage />,
  },
]);
const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
