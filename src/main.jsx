import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
