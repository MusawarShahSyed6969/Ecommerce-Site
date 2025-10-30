// components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { userInfo,loading } = useSelector((state) => state.auth);


  if (!userInfo || !userInfo.token) return <Navigate to="/login" replace />;
  if (adminOnly && userInfo.user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};


export default ProtectedRoute;
