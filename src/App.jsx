import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const GroupPage = lazy(() => import("./pages/GroupPage"));
const GroupChatContainer = lazy(() =>
  import("./components/groupChatContainer/GroupChatContainer")
);
const Layout = lazy(() => import("./components/layout/Layout"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
