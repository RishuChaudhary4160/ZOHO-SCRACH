import React, { Suspense } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
// const Permission = atob(localStorage.getItem("permission"));
const Permission = localStorage.getItem("permission");

const LoginCard = React.lazy(() => import("../components/loginCard"));
import ProtectedRoutes from "../authGuard/protectedRoutes";
import HomePage from "../pages/HomePage";
import AttendancesPage from "../pages/AttendancesPage";
const SuspenseWrapper = ({ children }) => {
  return <Suspense>{children}</Suspense>;
};
const isLoggedIn = localStorage.getItem("status") === "active" ? true : false;
const adminRoutes = Permission === "superadmin" ? [] : [];

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <SuspenseWrapper>
        <LoginCard />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <Navigate to={isLoggedIn ? "/home" : "/login"} />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [{ index: true, path: "my", element: <HomePage /> }],
  },
  {
    path: "/attendances",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [{ index: true, path: "my", element: <AttendancesPage /> }],
  },
  ...adminRoutes,
]);
