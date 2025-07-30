"use strict";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from '@pages/Root'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Error404 from '@pages/Error404'
import Users from '@pages/Users'
import Profile from '@pages/Profile'
import ProtectedRoute from '@components/ProtectedRoute'
import Voting from "@pages/voting"
import CreateVoting from "@pages/CreateVoting";
import Reuniones from "@pages/Reunion";
import CreateReunion from "@pages/CreateReunion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path:"/voting",
        element: <Voting />,
      },
      {
        path: "/createvoting",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <CreateVoting />
          </ProtectedRoute>
        )
      },
      {
        path: "/reuniones",
        element: <Reuniones />,
      },
      {
        path: "/createreunion",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <CreateReunion />
          </ProtectedRoute>
        )
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
