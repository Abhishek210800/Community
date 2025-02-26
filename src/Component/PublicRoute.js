import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/Dashboard" replace /> : children;
};

export default PublicRoute;