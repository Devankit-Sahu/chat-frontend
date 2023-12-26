import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import ChatPage from "./pages/ChatPage";
import GroupPage from "./pages/GroupPage";
import { GroupChatContainer, Layout } from "./components";
import ChatLayout from "./pages/ChatLayout";
import ChatContainer from "./components/chatbox/ChatContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ChatPage />,
        // element: <ChatLayout />,
        // children: [
        //   {
        //     path: ":id",
        //     element: <ChatContainer />,
        //   },
        // ],
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
