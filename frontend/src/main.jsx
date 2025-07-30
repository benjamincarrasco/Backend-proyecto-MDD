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
<<<<<<< HEAD
import Reuniones from "@pages/Reunion";
import CreateReunion from "@pages/CreateReunion";
=======
// ... (imports existentes)
import ActasAdmin from '@pages/ActasAdmin'; // Importa la nueva página
>>>>>>> 6d4ab2e8531092feea3f282e082f9bdd05d1dc4d

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
<<<<<<< HEAD
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
=======
        path: "/actas-admin", // Nueva ruta para la administración de actas
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}> {/* Solo administradores pueden acceder */}
            <ActasAdmin />
          </ProtectedRoute>
        ),
      }
>>>>>>> 6d4ab2e8531092feea3f282e082f9bdd05d1dc4d
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
