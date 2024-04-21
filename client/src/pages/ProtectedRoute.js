import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../utils/localStorage";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getTokenFromLocalStorage()) {
      navigate("/login");
    }
  }, [navigate]);

  return <Outlet />;
}
