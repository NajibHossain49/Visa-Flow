import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import HomePage from "../Pages/HomePage";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import ForgotPassword from "../Authentication/ForgotPassword";
import ErrorPage from "../Pages/ErrorPage";
import AddVisa from "../Pages/AddVisa";
import AllVisas from "../Pages/AllVisas";
import VisaDetails from "../Pages/VisaDetails";
import MyAddedVisas from "../Pages/MyAddedVisas";
import ShowVisaApplications from "../Pages/ShowVisaApplications";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-visas",
        element: <AllVisas />,
      },
      {
        path: "/visa/:id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisas />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-visa-applications",
        element: (
          <PrivateRoute>
            <ShowVisaApplications />
          </PrivateRoute>
        ),
      },

      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  // Catch-all route for unmatched paths
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
